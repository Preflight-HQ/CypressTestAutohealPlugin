export default class PfElement {
    readonly Element: Node;
    isTagNode: boolean;
    constructor(element: Node);
    get HtmlElement(): HTMLElement;
    get id(): string | null;
    get classList(): string[];
    get parent(): PfElement | null;
    get display(): string;
    getComputedStyleProperty(property: string): string;
    get isVisibleBySize(): boolean;
    isElementValid(): boolean;
    get validChildren(): PfElement[];
    get childrenCount(): number;
    get children(): PfElement[];
    get nextSiblings(): PfElement[];
    get prevSiblings(): PfElement[];
    get boundingRect(): DOMRect;
    eq(pEl: PfElement | null): boolean;
    isNodeName(tagName: any): boolean;
    get tagName(): string;
    getAttribute(attName: any): string;
    get innerText(): string;
    get innerTexts2(): string[];
    get innerTexts(): string[];
    get isTextElement(): boolean;
}
