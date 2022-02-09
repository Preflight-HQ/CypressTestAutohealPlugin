import { Primitive } from "./primitive";
import { ParsedElement } from "./ParsedElement";
import { ParsedElContext } from "./parsedData/ParsedElContext";
export declare class TextElement extends ParsedElement {
    constructor(node: Primitive, confidence?: number);
    protected getDataForContextHash(): (string | null | undefined)[];
    protected getContext(): ParsedElContext[];
}
