import ContextParserSearchModule from "../ContextParserSearchModule";
import ElementSelectorsSearchModule from "../ElementSelectorsSearchModule";
import PreflightGlobalStore from "../PreflightGlobalStore";
import ElementsSelector from "./ElementsSelector";
import ElementFinderSearchData from "../models/ElementFinderSearchData";
import ElementSearchResults from "../models/ElementSearchResults";
import {ElementSearchMethod} from "../enums/ElementSearchMethod";
import ElementSearchResult from "../models/ElementSearchResult";
import autohealApiService from "../APIs/autohealApiService";
import CyPomAutohealData from "../models/CyPomAutohealData";
import TestActionData from "../models/TestActionData";
// @ts-ignore
import {ContextParserDataDB} from "./../packages/preflight-web-parser";
import {isString} from "./globalHelpers";

export default class ElementFinder {
  private doc: Document;
  public lastError:string = null;
  public elSelector:ElementsSelector = null;
  public static readonly ReliableScore = 1.25;

  constructor(document: Document, parentIframeSelector: string){
    this.doc = document;
    this.elSelector = new ElementsSelector(this.doc, parentIframeSelector);
  }

  public static isCypressPomElementId(elementId: string){
    return isString(elementId) && elementId.startsWith('pom');
  }

  public static getGuidCypressPomElGuid(elementId: string): string{
    return this.isCypressPomElementId(elementId) ? elementId.replace(/^pom/, '') : elementId;
  }

  public async getTestAutohealData(testId: string, testTitle:string): Promise<any | null> {
    let currentTestData = PreflightGlobalStore.state.currentTestData;
    if(currentTestData) {
      return currentTestData;
    }
    try {
      let autohealResponse = await autohealApiService.getData(testId, testTitle);
      if(!autohealResponse){
        return null;
      }
      let testAutohealData = JSON.parse(autohealResponse.dataJson);
      return testAutohealData;
    } catch (e) {
      this.lastError = 'Autoheal request failed: ' + e.responseText
      return null;
    }
  }

  public async findTestElementByAutohealData(testId: string, actionId: string, testTitle: string) {
    if(!testId || !actionId){
      this.lastError = 'Autoheal was not initialized correctly for action id: ' + actionId;
      return null;
    }
    let testAutohealData = await this.getTestAutohealData(testId, testTitle);
    PreflightGlobalStore.state.currentTestData = testAutohealData;
    let actionAutohealData = testAutohealData?.actions.find(a => a.guid == actionId)?.data;
    if(!testAutohealData){
      return null;
    }

    let testActionData = new TestActionData(actionAutohealData);
    let elFinderSearchData = new ElementFinderSearchData(testActionData.mainSelectors, testActionData.possibleSelectors, testActionData.expectedText);
    let elementSelectorsSearch = new ElementSelectorsSearchModule(this.elSelector);
    let parserData = testActionData.parserData ? await ContextParserSearchModule.getParserDataFromUrl(testActionData.parserData) : null;

    let searchResults =  await elementSelectorsSearch.search(elFinderSearchData);

    if(searchResults.isReliableResultFound){
      return await this.getSearchResult(searchResults, parserData);
    }
    searchResults = await this.findElWithContextParser(parserData, searchResults);
    return await this.getSearchResult(searchResults, parserData);
  }

  public async findPomElementByAutohealData(elementId: string, testTitle: string) {
    elementId = ElementFinder.getGuidCypressPomElGuid(elementId);
    let autohealDataResponse = await this.getTestAutohealData(elementId, testTitle);
    if(!autohealDataResponse){
      return null;
    }
    debugger
    let cyPomAutohealData = new CyPomAutohealData(autohealDataResponse.selectors, autohealDataResponse.parsedData);
    let parserData = cyPomAutohealData.parserData;
    let elFinderSearchData = new ElementFinderSearchData(cyPomAutohealData.selectors);
    let elementSelectorsSearch = new ElementSelectorsSearchModule(this.elSelector);

    let searchResults =  await elementSelectorsSearch.search(elFinderSearchData);

    if(searchResults.isReliableResultFound && false){
      return await this.getSearchResult(searchResults, parserData);
    }
    searchResults = await this.findElWithContextParser(parserData, searchResults);
    return await this.getSearchResult(searchResults, parserData);
  }

  private async findElWithContextParser(elementParserData: ContextParserDataDB, previousSearchResults: ElementSearchResults) {
    if(!elementParserData){
      return null;
    }
    let parserSearch = new ContextParserSearchModule(this.doc);

    let parserSearchResult = await parserSearch.findElement(elementParserData);
    if(!parserSearchResult){
      return previousSearchResults;
    }
    let elSearchResult = new ElementSearchResult(parserSearchResult.element, ElementSearchMethod.CONTEXT_AWARENESS, 2*parserSearchResult.confidence);
    elSearchResult.contextAwarenessResult = parserSearchResult;
    previousSearchResults.searchResults.push(elSearchResult)
    return previousSearchResults;
  }

  private async getSearchResult(searchResults: ElementSearchResults, parserData: ContextParserDataDB | null){
    let bestResult = searchResults.bestResult;
    if(!bestResult || bestResult.score < 1){
      return 0;
    }
    let elementSimplePath: string = null;
    if(bestResult.contextAwarenessResult){
      elementSimplePath = bestResult.contextAwarenessResult.foundElementLocation;
    } else {
      let parserSearch = new ContextParserSearchModule(this.doc);
      elementSimplePath = parserSearch.getSimpleMessage(await parserSearch.getSimplePathFromParserData(parserData));
    }
    let visibleElement = this.elSelector.getVisibleElement([bestResult.element], 3)
    return {
      elementSimplePath,
      selector: bestResult?.bestSelector,
      element:  visibleElement
    }
  }

}
