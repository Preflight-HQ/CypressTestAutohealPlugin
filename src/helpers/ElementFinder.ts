import {first, sleepAsync} from "./globalHelpers";
import BaseRequestService from "../BaseRequestService";
import ElementSelectorsSearch from "../ElementSelectorsSearch";

export default class ElementFinder {
  private doc: Document;
  private Cypress: any;

  constructor(document: Document, cypress: any){
    this.doc = document;
    this.Cypress = cypress;
  }

  public getElementsByXPath(xpath: string) : Element[]
  {
    let results = [];
    let query = document.evaluate(xpath, this.doc,
      null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
      results.push(query.snapshotItem(i));
    }
    return results;
  }

  public getElements(selector: string): Element[]{
    return this.isXpathSelector(selector) ? this.getElementsByXPath(selector) : Array.from(this.doc.querySelectorAll(selector));
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

  public async getTestAutohealData(testId: string): Promise<any | null> {
    let requestService = new BaseRequestService(this.Cypress.Preflight.apiUrl);
    let requestData = {
      testName: this.Cypress.mocha.getRunner().suite.ctx.test.title,
      base64AuthKey: this.Cypress.Preflight.autohealApiToken
    }

    let currentTestData = this.Cypress.Preflight.tests[testId];
    if(currentTestData) {
      return currentTestData;
    }
    try {
      let autohealResponseJson = await requestService.post('Autoheal/TestData/' + testId, requestData);
      if(!autohealResponseJson){
        return null;
      }
      let autohealResponse = JSON.parse(autohealResponseJson);
      let testAutohealData = JSON.parse(autohealResponse.dataJson);
      this.Cypress.Preflight.tests[testId] = testAutohealData;
      return testAutohealData;
    } catch (e) {
      return null;
    }
  }

  public async findElementByAutohealData(testId: string, actionId: string) {
    let testAutohealData = await this.getTestAutohealData(testId);
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
    return {
      selector: bestResultSelector,
      element:  visibleElement
    }
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
