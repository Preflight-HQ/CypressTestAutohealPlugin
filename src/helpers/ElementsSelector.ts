import {first, sleepAsync} from "./globalHelpers";

export default class ElementsSelector {
  private doc: Document;
  public parentIframeSelector:string = null;

  constructor(document: Document, parentIframeSelector: string){
    this.doc = document;
    this.parentIframeSelector = parentIframeSelector;
  }

  public getElementsByXPath(xpath: string) : Element[]
  {
    let parent = this.parentIframeSelector ? this.doc.querySelector(this.parentIframeSelector) : this.doc;
    let results = [];
    let query = this.doc.evaluate(xpath, parent,
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

  public findFirstVisibleParent(element: Element, limit: number = 5){
    if(!element){
      return null;
    }
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
      if(elements.length > 0 && (this.isElVisible(elements[0]) || this.isFileInput(elements[0]))){
        return true;
      }
      await sleepAsync(500);
    }
    return false;
  }

  public isXpathSelector(input: string) : boolean{
    return input && !!input.match('^\\(*[.*]{0,1}/{1,2}')
  }

  public isFileInput(el){
    return el.tagName === 'INPUT' && el.getAttribute('type')?.toLowerCase() == 'file';
  }

  public isElVisible(el) {
    let result = (el && !(el.offsetWidth === 0 && el.offsetHeight === 0));
    return result;
  }

  public getVisibleElement(elements:Element[], findParentLimit:number = 5) {
    let visibleElement = elements.find(e => this.isElVisible(e))
    if(!visibleElement) {
      visibleElement = this.findFirstVisibleParent(first(elements), findParentLimit);
    }

    return visibleElement;
  }
}
