import { ParsedElement } from "./ParsedElement";
import { Primitive } from "./primitive";
import { ParsedElContext } from "./parsedData/ParsedElContext";
export declare class CheckboxElement extends ParsedElement {
    label: string | null;
    inputElement: Primitive | null | undefined;
    coreNode: Primitive | null;
    constructor(node: Primitive, coreNode: Primitive, confidence?: number);
    get toString(): string;
    protected getDataForContextHash(): (string | null | undefined)[];
    protected getContext(): ParsedElContext[];
}
