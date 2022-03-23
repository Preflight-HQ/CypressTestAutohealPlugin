export default class SelectorAttribute {
    type: string;
    value: string;
    isPartial: boolean;
    isUniqueInParentContext: boolean;
    isUniqueInPageContext: boolean;
    nthChildInParentContext: number;
    typeOccurrenceInParentContext: number;
    parentTag: string;
    constructor(type: string, value: string, isPartial?: boolean);
    get isAny(): boolean;
    get isIFrameTag(): boolean;
    get canBeCss(): boolean;
    get cssWithIndex(): string;
    get xPathWithIndex(): string;
    get xPathInContext(): string;
    get xPathInTopContext(): string;
    static isValidCssName(input: string): RegExpMatchArray;
    get css(): string;
    get xPath(): string;
    includesLevelAttributes(level: any, attributes: any): void;
}
