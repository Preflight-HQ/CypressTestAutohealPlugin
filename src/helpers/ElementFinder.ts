import {first, sleepAsync} from "./globalHelpers";
import preflightBaseApiService from "../APIs/preflightBaseApiService";
import ContextParserSearch from "../ContextParserSearch";
import ElementSelectorsSearch from "../ElementSelectorsSearch";
import PreflightGlobalStore from "../PreflightGlobalStore";

export default class ElementFinder {
  private doc: Document;
  public lastError:string = null;
  public parentIframeSelector:string = null;

  constructor(document: Document, parentIframeSelector: string){
    this.doc = document;
    this.parentIframeSelector = parentIframeSelector;
  }

  public getElementsByXPath(xpath: string) : Element[]
  {
    let parent = this.parentIframeSelector ? this.doc.querySelector(this.parentIframeSelector) : this.doc;
    let results = [];
    let query = document.evaluate(xpath, parent,
      null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
      results.push(query.snapshotItem(i));
    }
    return results;
  }

  public getElements(selector: string, parentSelector: string|null = this.parentIframeSelector): Element[]{
    let parent = this.doc;
    if (parentSelector){
      // @ts-ignore
      let iframeDoc = this.getFirstElement(parentSelector, null)?.contentDocument;
      parent = iframeDoc || this.doc;
    }
    return this.isXpathSelector(selector) ? this.getElementsByXPath(selector) : Array.from(parent.querySelectorAll(selector));
  }

  public getFirstElement(selector: string, parentSelector: string|null = this.parentIframeSelector): Element{
    return first(this.getElements(selector, parentSelector));
  }

  private findFirstVisibleParent(element: Element, limit: number = 5){
    let newElement = element;
    for(let i = 0; i < limit; i++){
      if(this.isElVisible(newElement)){
        return newElement;
      }
      newElement = newElement.parentElement;
    }
    return element;
  }

  public async isElOnPage(selector: string, timeout: number = 5000){
    let endTime = Date.now() + timeout
    while(endTime > Date.now()) {
      let elements = this.getElements(selector);
      if(elements.length > 0 && this.isElVisible(elements[0])){
        return true;
      }
      await sleepAsync(500);
    }
    return false;
  }

  public isXpathSelector(input: string) : boolean{
    return input && !!input.match('^\\(*[.*]{0,1}/{1,2}')
  }

  public isElVisible(el) {
    let result = !(el.offsetWidth === 0 && el.offsetHeight === 0);
    return result;
  }

  public async getTestAutohealData(testId: string, testTitle:string): Promise<any | null> {
    let requestData = {
      testName: testTitle,
      base64AuthKey: PreflightGlobalStore.autohealApiToken
    }

    let currentTestData = PreflightGlobalStore.state.currentTestData;
    if(currentTestData) {
      return currentTestData;
    }
    try {
      let autohealResponseJson = await preflightBaseApiService.post('Autoheal/TestData/' + testId, requestData);
      if(!autohealResponseJson){
        return null;
      }
      let autohealResponse = JSON.parse(autohealResponseJson);
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
    let selectors = this.getSelectorsFromAutohealData(actionAutohealData);
    let elementSelectorsSearch = new ElementSelectorsSearch(this.doc);
    elementSelectorsSearch.startSearch(selectors.css, selectors.xpath);
    await sleepAsync(2000);
    let bestResult = elementSelectorsSearch.stopSearch();
    if(!bestResult){
      return null;
    }
    let bestResultSelector = bestResult.selector;
    let visibleElement = this.getVisibleElement(this.getElements(bestResultSelector), 3)
    let parserElementSimplePath = await this.getElSimplePath(actionAutohealData);
    return {
      elementSimplePath: parserElementSimplePath || bestResultSelector,
      selector: bestResultSelector,
      element:  visibleElement
    }
  }

  private async getElSimplePath(actionAutohealData: any[]) {
    let parserDataUrl = actionAutohealData.find(ads => ads.type == 'contextparserdata')?.value;
    if(!parserDataUrl){
      return null;
    }
    let parserSearch = new ContextParserSearch(this.doc);
    let simplePath = await parserSearch.getSimplePathFromActionData(parserDataUrl);
    return parserSearch.getSimpleMessage(simplePath);

  }

  public getVisibleElement(elements:Element[], findParentLimit:number = 5) {
    let visibleElement = elements.find(e => this.isElVisible(e))
    if(!visibleElement) {
      visibleElement = this.findFirstVisibleParent(first(elements), findParentLimit);
    }

    return visibleElement;
  }

  private getSelectorsFromAutohealData(actionAutohealData: any[]){
    let cssSelectors = actionAutohealData.filter(ads => ads.type.includes('css')).map(d => d.value);
    let xpathSelectors = actionAutohealData.filter(ads => ads.type.includes('xpath')).map(d => d.value);
    return {
      xpath: xpathSelectors,
      css: cssSelectors
    }
  }
}
