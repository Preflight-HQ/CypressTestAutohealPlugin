import ElementsSelector from "./helpers/ElementsSelector";
import ElementSearchResult from "./models/ElementSearchResult";
import {first, sleepAsync} from "./helpers/globalHelpers";
import ElementFinderSearchData from "./models/ElementFinderSearchData";
import {ElementSearchMethod} from "./enums/ElementSearchMethod";
import ElementSearchResults from "./models/ElementSearchResults";

export default class ElementSelectorsSearchModule {
  doc = null;
  private elSelector: ElementsSelector;

  constructor(elSelector: ElementsSelector) {
    this.doc = document;
    this.elSelector = elSelector;
  }

  public async search(elFinderData: ElementFinderSearchData, timeout: number = 3000): Promise<ElementSearchResults> {
    let endTime = Date.now() + timeout
    let searchResults = new ElementSearchResults();
    while(endTime > Date.now()) {
      let mainSelectorsResults = elFinderData.mainSelectors.map(s => this.elSelector.getElements(s)).filter(e => !!e);
      let possibleSelectorsResults = elFinderData.possibleSelectors.map(s => this.elSelector.getElements(s)).filter(e => !!e);
      let results:ElementSearchResult[] = [];
      elFinderData.mainSelectors.forEach((selector: string) => {
        let resultElements = this.elSelector.getElements(selector).filter(e => !!e);
        if(resultElements.length > 0) {
          let score = 1;
          score = score / resultElements.length;
          if (elFinderData.expectedText && first(resultElements)?.inneText?.trim() != elFinderData.expectedText) {
            score -= 0.25;
          }
          results.push(new ElementSearchResult(first(resultElements), ElementSearchMethod.SELECTORS, score, selector));
        }
      });

      elFinderData.possibleSelectors.forEach((selector: string) => {
        let resultElements = this.elSelector.getElements(selector).filter(e => !!e);
        if(resultElements.length > 0) {
          let score = 0.5;
          score = score / resultElements.length;
          let expectedText = elFinderData.expectedText;
          let elText = first(resultElements)?.innerText;
          if (expectedText && elText?.trim()?.toLowerCase() != expectedText?.trim()?.toLowerCase()) {
            score -= 0.25;
          }
          results.push(new ElementSearchResult(first(resultElements), ElementSearchMethod.SELECTORS, score, selector));
        }
      })
      searchResults = new ElementSearchResults(results);
      if(searchResults.isReliableResultFound){
        return searchResults;
      }
      await sleepAsync(500);
    }

    return searchResults;
  }
}
