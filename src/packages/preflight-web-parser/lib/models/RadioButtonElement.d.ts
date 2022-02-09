import { ParsedElement } from "./ParsedElement";
import { Primitive } from "./primitive";
import { ParsedElContext } from "./parsedData/ParsedElContext";
export declare class RadioButtonElement extends ParsedElement {
    label: string | null;
    constructor(node: Primitive, coreEl: Primitive, confidence?: number);
    get toString(): string;
    protected getDataForContextHash(): (string | null | undefined)[];
    protected getContext(): ParsedElContext[];
}
