import { ElementType } from "../types/enums/ElementType";
import { Primitive } from "./primitive";
import { ParsedElementData } from "./parsedData/ParsedElementData";
import { ParsedElContext } from "./parsedData/ParsedElContext";
import { ContextType } from "../types/enums/ContextType";
export declare class ParsedElement {
    constructor(element: Primitive, type?: ElementType, confidence?: number);
    guid: string;
    element: Primitive;
    type: ElementType;
    confidence: number;
    parent: ParsedElement | null;
    children: ParsedElement[];
    isFinalNode: boolean;
    purpose: any | undefined;
    contextHash: string | null;
    isRecurring: boolean;
    recurringGroup: string | null;
    get toString(): string;
    refreshParsedData(): void;
    clearHierarchy(): void;
    markInDOM(): void;
    toData(): ParsedElementData;
    protected getDataForContextHash(): (string | null | undefined)[];
    getContextHash(): string;
    protected getContext(): ParsedElContext[];
    protected getContextForClasses(el: Primitive, contextType?: ContextType): ParsedElContext[];
    delete(): void;
}
