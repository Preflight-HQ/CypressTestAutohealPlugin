export default class ElementsSelector {
    private readonly doc;
    parentIframeSelector: string;
    constructor(document: Document, parentIframeSelector?: string);
    static isXpathSelector(input: string): boolean;
    getElementsByXPath(xpath: string, context?: Document | HTMLElement): HTMLElement[];
    getElementsByCss(selector: string, context?: Document | HTMLElement): HTMLElement[];
    getElements(selector: string, context?: Document | HTMLElement): HTMLElement[];
    getFirstElement(selector: string, context?: Document | HTMLElement): HTMLElement;
    static findFirstVisibleParent(element: HTMLElement, limit?: number): HTMLElement;
    isElOnPage(selector: string, timeout?: number): Promise<boolean>;
    static isFileInput(el: any): boolean;
    static isElVisible(el: any): boolean;
    static getVisibleElement(elements: Element[], findParentLimit?: number): Element;
    private getElementsByXPathInner;
    private getElementsByCssInner;
    private getParentIframeEl;
    private getElementsInner;
    private getFirstElementInner;
}
