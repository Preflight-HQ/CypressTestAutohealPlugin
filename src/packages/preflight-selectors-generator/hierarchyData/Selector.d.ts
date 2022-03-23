import SelectorAttribute from "@/hierarchyData/SelectorAttribute";
export default class Selector {
    elementsAttributes: SelectorAttribute[][];
    isUniqueOnPage(doc?: Document): boolean;
    isValid(doc?: Document): boolean;
    selectElements(doc?: Document): HTMLElement[];
    get numberOfAnyAttributes(): number;
    get numberOfNonAnyAttributes(): number;
    get canBeCss(): boolean;
    get attributesCount(): number;
    get selectorCss(): string;
    get selectorXPath(): string;
    private getAttributeOrder;
    clone(): Selector;
    eq(b: Selector): boolean;
}
