import ElementFinder from "../helpers/ElementFinder";
import loggerService from "../helpers/loggerService";
import PreflightGlobalStore from "../PreflightGlobalStore";
import reportService from "../helpers/reportService";
import ElementsSelector from "../helpers/ElementsSelector";
import { SelectorsGenerator } from "../packages/preflight-selectors-generator/index";
import {first} from "../helpers/globalHelpers";
import GetElementCommandResult from "../models/GetElementCommandResult";

export default class GetElementCommand {
  private readonly doc: Document;
  private readonly mainSelector: string;
  private readonly options: any;
  private readonly testTitle: string;
  private readonly elementId: string;
  private elSelector: ElementsSelector;
  private elFinder: ElementFinder;
  private _isElMainSelOnPage: boolean | undefined = undefined;

  constructor(document: Document, selector, options, elementId, testTitle) {
    this.doc = document;
    this.elementId = elementId;
    this.mainSelector = selector;
    this.options = options;
    this.testTitle = testTitle;
    this.elSelector = new ElementsSelector(this.doc, this.parentIframeSelector);
    this.elFinder = new ElementFinder(this.doc, this.parentIframeSelector);
  }

  public get parentIframeSelector(): string|null {
    return this.options?.iframe;
  }

  public get isMainSelectorXPath(): boolean {
    return this.elSelector.isXpathSelector(this.mainSelector);
  }

  public getLogSelector(selector): string {
    return this.parentIframeSelector ? `iframe(${this.parentIframeSelector}) => ${selector}` : selector;
  }

  public async isElMainSelOnPage(): Promise<boolean> {
    if(this._isElMainSelOnPage != undefined){
      return this._isElMainSelOnPage;
    }
    return await this.elSelector.isElOnPage(this.mainSelector, 4000)
  }

  public async doesElementExistOnPage() {
    if(this.elSelector.isXpathSelector(this.mainSelector) || this.parentIframeSelector){
      return false;
    }
    return await this.isElMainSelOnPage();
  }

  public async process(): Promise<GetElementCommandResult> {
    // if we can resolve element without autoheal
    if(await this.isElMainSelOnPage()){
      let element = this.elSelector.getFirstElement(this.mainSelector);
      loggerService.log(this.isMainSelectorXPath ? 'get-xPath' : 'get', this.getLogSelector(this.mainSelector), element, this.options);
      return new GetElementCommandResult(element, this.mainSelector);
    }

    if(!this.elementId){
      this.elNotFoundException();
    }

    loggerService.log('log',`Element not found with existing selector "${this.mainSelector}". Trying to apply test autoheal data.`, null, this.options)
    let searchResult = null;
    if(ElementFinder.isCypressPomElementId(this.elementId)){
      searchResult = await this.elFinder.findPomElementByAutohealData(this.elementId, this.testTitle);
    } else {
      searchResult = await this.elFinder.findTestElementByAutohealData(PreflightGlobalStore.state.currentTestId, this.elementId, this.testTitle);
    }
    if(!searchResult){
      this.elNotFoundException(this.elFinder.lastError);
      return null;
    }
    if(!searchResult.selector) {
      let generator = new SelectorsGenerator();
      searchResult.selector = first(generator.getBestSelectors(searchResult.element, 5))?.value;
    }
    loggerService.log('get-autoheal', searchResult.elementSimplePath || searchResult.selector, searchResult.element, this.options);
    reportService.pushData(this.mainSelector, this.elementId, searchResult);
    let result = new GetElementCommandResult(searchResult.element, searchResult.selector);
    result.isFoundByAutoheal = true;
    result.elementSimplePath = searchResult.elementSimplePath;
    return result;
  }

  private elNotFoundException(m?: string | undefined){
    throw new Error('Element not found.' + ((!m || m.trim() == 'undefined') ? '' : ' ' + m));
  }
}
