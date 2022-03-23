import SelectorScore from "./SelectorScore";
import PfElement from "@/models/PfElement";
export default class SelectorsGenerator {
    private doc;
    usedVariables: string[];
    constructor(usedVariables?: any[]);
    getOwnerDocumentOfElement(element: any): Document;
    static findBestSelector(selectors: SelectorScore[], minScoreIfPossible?: number): SelectorScore;
    static findBestSelectors(selectors: SelectorScore[], maxResults?: number): SelectorScore[];
    static findBestStringSelectors(selectors: string[], maxResults?: number, target?: Element, doc?: Document, usedVariables?: any[]): SelectorScore[];
    getSelectors(el: HTMLElement, maxResults: any, onlyCss?: boolean): SelectorScore[];
    getSelectorsOldWay(el: HTMLElement): SelectorScore[];
    getBestSelectors(el: HTMLElement, maxResults?: number, onlyCss?: boolean): SelectorScore[];
    getBestSelector(el: HTMLElement, onlyCss?: boolean): string;
    test(el: HTMLElement): void;
    static getXPathSelectorScore(selector: string, targetEl?: PfElement, usedVariables?: any[], doc?: Document): number;
    static getCssSelectorScore(selector: string, targetEl?: PfElement, usedVariables?: any[], doc?: Document): number;
    private generateSelectors;
}
