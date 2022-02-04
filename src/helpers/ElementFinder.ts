import ContextParserSearchModule from "../ContextParserSearchModule";
import ElementSelectorsSearchModule from "../ElementSelectorsSearchModule";
import PreflightGlobalStore from "../PreflightGlobalStore";
import ElementsSelector from "./ElementsSelector";
import ElementFinderSearchData from "../models/ElementFinderSearchData";
import ElementSearchResults from "../models/ElementSearchResults";
import {ElementSearchMethod} from "../enums/ElementSearchMethod";
import ElementSearchResult from "../models/ElementSearchResult";
import autohealApiService from "../APIs/autohealApiService";

export default class ElementFinder {
  private doc: Document;
  public lastError:string = null;
  public elSelector:ElementsSelector = null;
  public static readonly ReliableScore = 1.25;

  constructor(document: Document, parentIframeSelector: string){
    this.doc = document;
    this.elSelector = new ElementsSelector(this.doc, parentIframeSelector);
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
      PreflightGlobalStore.state.currentTestData = testAutohealData;
      return testAutohealData;
    } catch (e) {
      this.lastError = 'Autoheal request failed: ' + e.responseText
      return null;
    }
  }

  public async findElementByAutohealData(testId: string, actionId: string, testTitle: string) {
    let testAutohealData = await this.getTestAutohealData(testId, testTitle);
    let actionAutohealData = testAutohealData?.actions.find(a => a.guid == actionId)?.data;
    if(!testAutohealData){
      return actionAutohealData;
    }

    let elFinderSearchData = new ElementFinderSearchData(actionAutohealData);
    let elementSelectorsSearch = new ElementSelectorsSearchModule(this.elSelector);
    let searchResults =  await elementSelectorsSearch.search(elFinderSearchData);
    if(searchResults.isReliableResultFound){
      return await this.getSearchResult(searchResults, actionAutohealData);
    }
    searchResults = await this.findElWithContextParser(actionAutohealData, searchResults);
    return await this.getSearchResult(searchResults, actionAutohealData);
  }

  private async findElWithContextParser(actionAutohealData: any[], previousSearchResults: ElementSearchResults) {
    let parserDataUrl = actionAutohealData.find(ads => ads.type == 'contextparserdata')?.value;
    if(!parserDataUrl){
      return null;
    }
    let parserSearch = new ContextParserSearchModule(this.doc);

    let parserSearchResult = await parserSearch.findElement(parserDataUrl);
    if(!parserSearchResult){
      return previousSearchResults;
    }
    let elSearchResult = new ElementSearchResult(parserSearchResult.element, ElementSearchMethod.CONTEXT_AWARENESS, 2*parserSearchResult.confidence);
    elSearchResult.contextAwarenessResult = parserSearchResult;
    previousSearchResults.searchResults.push(elSearchResult)
    return previousSearchResults;
  }

  private async getSearchResult(searchResults: ElementSearchResults, actionData){
    let bestResult = searchResults.bestResult;
    if(!bestResult || bestResult.score < 1){
      return 0;
    }
    let elementSimplePath: string = null;
    if(bestResult.contextAwarenessResult){
      elementSimplePath = bestResult.contextAwarenessResult.foundElementLocation;
    } else {
      let parserSearch = new ContextParserSearchModule(this.doc);
      let parserDataUrl = actionData.find(ads => ads.type == 'contextparserdata')?.value;
      elementSimplePath = parserSearch.getSimpleMessage(await parserSearch.getSimplePathFromActionData(parserDataUrl));
    }
    let visibleElement = this.elSelector.getVisibleElement([bestResult.element], 3)

    return {
      elementSimplePath,
      selector: bestResult.bestSelector,
      element:  visibleElement
    }
  }

}
