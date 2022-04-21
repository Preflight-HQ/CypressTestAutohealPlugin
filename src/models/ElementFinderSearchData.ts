export default class ElementFinderSearchData {
  public mainSelectors: string[];
  public possibleSelectors: string[];
  public expectedText: string | null;

  constructor(mainSelectors: string[], possibleSelectors: string[] = [], expectedText: string | null = null){
    this.mainSelectors = mainSelectors;
    this.possibleSelectors = possibleSelectors;
    this.expectedText = expectedText;
  }




}
