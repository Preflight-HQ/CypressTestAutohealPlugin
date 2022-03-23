export default class XPathGenerator {
    private doc;
    checkVisibility: boolean;
    excludedKeywords: any[];
    constructor(doc: any, checkVisibility?: boolean, excludedKeywords?: string[]);
    getOwnerDocumentOfElement: (element: any) => any;
    updateDocument(element: any): void;
    generateXPath(element: any): any[];
    getAttributes(element: any): any[];
    getTagName(element: any): {
        i: number;
        t: any;
    } | {
        i: number;
        t?: undefined;
    };
    getTagId(tagName: any): {
        i: number;
        t: any;
    } | {
        i: number;
        t?: undefined;
    };
    getTagNameFromTagObj(tag: any): any;
    getPreviousSiblings(element: any): any[];
    getNextSiblings(element: any): any[];
    getData(element: any, level?: number): {
        ta: {
            i: number;
            t: any;
        } | {
            i: number;
            t?: undefined;
        };
        a: any[];
        p: any;
        ps: any[];
        ns: any[];
        t: any[];
    };
    findElementsByXpath(xpathToExecute: any): any[];
    isVisible(el: any): boolean;
    isSelect(el: any): boolean;
    containsExcludedKeywords(text: any): boolean;
    getText(element: any, result?: any[], parents?: any[], level?: number, deep?: boolean): any[];
    getTagNameFromElement(el: any): any;
    xpathStrategyFormElement(el: any): any[];
    xpathStrategyFormElementParent(el: any): any[];
    xpathStrategyFromElementAttribute(el: any, attribute: any): string;
    xpathStrategyFromElementAttributes(el: any): any[];
    xpathStrategyText(el: any): any[];
    prepareElement(el: any): void;
    neutralizeElement(el: any): void;
    xPathStrategyDescendantText(data: any): any[];
    xpathStrategyTextInSameLevel(data: any): any[];
    getXpathFromUpperEl(upperEl: any, el: any): any[];
    xpathStrategyUpperText(el: any): any[];
    getAttributesSelector(el: any, maxAttributes: any): string;
    getSelectableInnerTextForXPath(inputText: any, maxWrodsCount?: number): any;
    getElementTextForXpath(el: any): string;
    xpathStrategyFormAncestorText(el: any): any[];
    getHandlerElement(el: any): any;
    xpathStrategies(el: any): any[];
}
