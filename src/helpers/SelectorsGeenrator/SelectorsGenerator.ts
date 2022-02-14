import xPathGenerator from "./xPathGenerator";
import CssSelectorGenerator from "./selector-generator";
import Selector from "./Selector";
import {first} from "../globalHelpers";

export default class SelectorsGenerator {
  private readonly doc: Document = null
  constructor(doc: Document = document){
    this.doc = doc;
  }

  getSelectors(el: HTMLElement): Selector[]{
    CssSelectorGenerator.doc = this.doc;
    xPathGenerator.doc = this.doc;
    const cssSelector = CssSelectorGenerator.getSelector(el);
    const xpaths = xPathGenerator.generateXPath(el);

    let primaryCss = [new Selector('css', cssSelector, 1)]
    let primaryXpath = xpaths.unique.map(s => new Selector('xpath', s, 1.1));
    let secondaryXpath = xpaths.unique.map(s => new Selector('xpath', s, 0.5));

    return [...primaryCss, ...primaryXpath, ...secondaryXpath];
  }

  getBestSelectors(el: HTMLElement, maxResults:number = 1, forceMixTypes:Boolean = false): Selector[]{
    let selectors = this.getSelectors(el);
    selectors = selectors.sort((a, b) => b.score - a.score);
    return selectors.slice(0, maxResults);
  }

  getBestSelector(el: HTMLElement){
    return first(this.getBestSelectors(el, 1))
  }
}
