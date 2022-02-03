import ElementSearchResult from "./ElementSearchResult";
import {first, groupBy} from "../helpers/globalHelpers";
import ElementSearchResultGrouped from "./ElementSearchResultGrouped";
import ElementFinder from "../helpers/ElementFinder";

export default class ElementSearchResults {
  public searchResults: ElementSearchResult[] = [];

  constructor(searchResults: ElementSearchResult[] = []){
    this.searchResults = searchResults;
  }

  public get isReliableResultFound() {
    let best = this.bestResult;
    return best && best.score >= ElementFinder.ReliableScore;
  }

  public get bestResult(): ElementSearchResultGrouped {
    let grouped = groupBy(this.searchResults, 'element');
    let groups = Object.values(grouped).map((g: ElementSearchResult[]) => new ElementSearchResultGrouped(g));
    return first(groups.sort((a, b) => a.score - b.score))
  }
}
