export default class ElementFinder {
  quickSearchBestResults = [];
  expectedText = [];
  cssSelectors = [];
  xpathSelectors = [];
  selectors = [];
  quickSearchInterval = null;
  searchElementsHandler = null;
  document = null;

  constructor(document) {
    this.document = document;
  }

  startSearch(cssSelectors, xpathSelectors, expectedText) {
    this.stopSearch();
    this.expectedText = expectedText;
    this.cssSelectors = cssSelectors.map(sel => {
      return { type: 'cssSelector', value: sel }
    });
    this.xpathSelectors = xpathSelectors.map(sel => {
      return { type: 'xpathSelector', value: sel }
    });
    this.selectors = [...this.cssSelectors, ...this.xpathSelectors];
    this.searchElementsHandler = this.searchElements.bind(this);
    this.searchElements();
    this.quickSearchInterval = setInterval(this.searchElementsHandler, 1000);
  }

  stopSearch(){
    if(!this.quickSearchInterval || !this.quickSearchBestResults) return
    clearInterval(this.quickSearchInterval)
    let bestResult = this.quickSearchBestResults.reduce((prev, current) => {
      return (prev && prev.score > current.score) ? prev : current
    }, null)
    this.quickSearchBestResults = [];
    return bestResult;
  }

  getElementByXpath(path) {
    try {
      return this.document.evaluate(path, this.document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    } catch (e) {
      return null;
    }
  }

  getElementByCss(path) {
    try {
      return this.document.querySelector(path);
    } catch (e) {
      return null;
    }
  }

  scoreExpectedText(elText, expectedText) {
    if (!elText || !expectedText) {
      return 0;
    }
    return elText.toLowerCase().trim() == expectedText.toLowerCase().trim() ? 0.5 : 0
  }

  mapElement(el, expectedText, selector) {
    try {
      let rect = el.getBoundingClientRect();
      return {
        selectorType: selector.type,
        selector: selector.value,
        text: el.textContent,
        tagName: el.tagName,
        selected: el.selected,
        enabled: !el.disabled,
        displayed: window.getComputedStyle(el).display != 'none',
        size: { width: rect.width, height: rect.height },
        location: { x: rect.x, y: rect.y },
        score: 1 + this.scoreExpectedText(el.textContent, expectedText)
      }
    } catch (e) {
      return null;
    }
  }

  searchElements() {
    let elements = []
    this.selectors.forEach(s => {
      let foundElement = null;
      if(s.type.includes('cssSelector')){
        foundElement = this.getElementByCss(s.value);
      }
      else if(s.type.includes('xpathSelector')){
        foundElement = this.getElementByXpath(s.value);
      }

      if(foundElement){
        let mappedElement = this.mapElement(foundElement, this.expectedText, s);
        if(mappedElement){
          elements.push(mappedElement)
        }
      }
    });
    elements.forEach(el => {
      let bestElFoundIndex =  this.quickSearchBestResults.findIndex(bel => bel.selector == el.selector)
      if(bestElFoundIndex == -1){
        this.quickSearchBestResults.push(el)
      }
      else if(this.quickSearchBestResults[bestElFoundIndex].score <= el.score){
        this.quickSearchBestResults.splice(bestElFoundIndex, 1, el);
      }
    })
    console.debug('Results: ', this.quickSearchBestResults);
  }
}
