import { ParsedElement } from "./ParsedElement";
import { Primitive } from "./primitive";
import { ParsedElContext } from "./parsedData/ParsedElContext";
export declare class RecurringBoxElement extends ParsedElement {
    parsedChildren: Primitive[];
    constructor(node: Primitive, parsedChildren: Primitive[], confidence?: number);
    protected getContext(): ParsedElContext[];
}
