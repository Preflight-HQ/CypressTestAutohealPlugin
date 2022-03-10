import {ElementSearchMethod} from "../enums/ElementSearchMethod";

export default class ElementSearchResult {
  public score: number = null;
  public searchMethod:ElementSearchMethod = ElementSearchMethod.SELECTORS;
  public element: Element = null;
  public contextAwarenessResult: any = null;
  public selector: string = null;

  constructor(el: Element, searchMethod: ElementSearchMethod, score: number, selector: string = null) {
    this.element = el;
    this.searchMethod = searchMethod;
    this.score = score;
    this.selector = selector;
  }
}
