import ElementFinder from "../helpers/ElementFinder";
import loggerService from "../helpers/loggerService";
import PreflightGlobalStore from "../PreflightGlobalStore";
import reportService from "../helpers/reportService";

export default class GetElementCommand {
  private readonly doc: Document;
  private readonly mainSelector: string;
  private readonly options: any;
  private readonly testTitle: string;
  private readonly actionId: string;
  private elFinder: ElementFinder;
  private _isElMainSelOnPage: boolean | undefined = undefined;

  constructor(document: Document, selector, options, actionId, testTitle) {
    this.doc = document;
    this.actionId = actionId;
    this.mainSelector = selector;
    this.options = options;
    this.testTitle = testTitle;
    this.elFinder = new ElementFinder(this.doc, this.parentIframeSelector);
  }

  public get parentIframeSelector(): string|null {
    return this.options?.iframe;
  }

  public get isMainSelectorXPath(): boolean {
    return this.elFinder.isXpathSelector(this.mainSelector);
  }

  public getLogSelector(selector): string {
    return this.parentIframeSelector ? `iframe(${this.parentIframeSelector}) => ${selector}` : selector;
  }

  public async isElMainSelOnPage(): Promise<boolean> {
    if(this._isElMainSelOnPage != undefined){
      return this._isElMainSelOnPage;
    }
    return await this.elFinder.isElOnPage(this.mainSelector, 4000)
  }

  public async canBeHandledWithOriginalGet() {
    if(this.elFinder.isXpathSelector(this.mainSelector) || this.parentIframeSelector){
      return false;
    }
    return await this.isElMainSelOnPage();
  }

  public async process(): Promise<Element> {

    // if we can resolve element without autoheal
    if(await this.isElMainSelOnPage()){
      let element = this.elFinder.getFirstElement(this.mainSelector);
      loggerService.log(this.isMainSelectorXPath ? 'get-xPath' : 'get', this.getLogSelector(this.mainSelector), element, this.options);
      return element;
    }

    if(!this.actionId || !PreflightGlobalStore.state.currentTestId){
      this.elNotFoundException();
    }

    loggerService.log('log',`Element not found with existing selector "${this.mainSelector}". Trying to apply test autoheal data.`, null, this.options)
    let searchResult = await this.elFinder.findElementByAutohealData(PreflightGlobalStore.state.currentTestId, this.actionId, this.testTitle);
    if(!searchResult){
      this.elNotFoundException(this.elFinder.lastError);
      return;
    }

    loggerService.log('get-autoheal', searchResult.elementSimplePath || searchResult.selector, searchResult.element, this.options);
    reportService.pushData(this.mainSelector, this.actionId, searchResult);
    return searchResult.element as Element;
  }

  private elNotFoundException(m?: string | undefined){
    throw new Error('Element not found.' + ((!m || m.trim() == 'undefined') ? '' : ' ' + m));
  }
}
