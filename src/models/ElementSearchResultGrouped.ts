import {first} from "../helpers/globalHelpers";
import ElementSearchResult from "./ElementSearchResult";
import {ElementSearchMethod} from "../enums/ElementSearchMethod";

export default class ElementSearchResultGrouped {
  public score: number = 0;
  public searchResults:ElementSearchResult[] = [];
  public element: Element = null;

  constructor(searchResults:ElementSearchResult[]) {
    this.element = first(searchResults).element;
    this.score = searchResults.map(sr => sr.score).reduce((r, s) => r + s);
    this.searchResults = searchResults;
  }

  public get bestSelector(): string | null {
    let selectors = this.searchResults.filter(g => g.searchMethod == ElementSearchMethod.SELECTORS && g.score > 0.7);
    return first(selectors.sort((a, b) => b.score - a.score));
  }

  public get contextAwarenessResult(): any | null {
    return this.searchResults.find(g => g.searchMethod == ElementSearchMethod.CONTEXT_AWARENESS && g.score > 0.7)?.contextAwarenessResult;
  }
}
