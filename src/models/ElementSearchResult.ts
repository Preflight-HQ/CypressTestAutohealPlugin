import {ElementSearchMethod} from "../enums/ElementSearchMethod";

export default class ElementSearchResult {
  public score: number = null;
  public searchMethod:ElementSearchMethod = ElementSearchMethod.SELECTORS;
  public element: Element = null;
  public contextAwarenessResult: any = null;

  constructor(el: Element, searchMethod: ElementSearchMethod, score: number) {
    this.element = el;
    this.searchMethod = searchMethod;
    this.score = score;
  }
}
