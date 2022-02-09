import { Primitive } from "./primitive";
import { ParsedElement } from "./ParsedElement";
import { ParsedElContext } from "./parsedData/ParsedElContext";
export declare class NavElement extends ParsedElement {
    buttons: Primitive[];
    inputs: Primitive[];
    constructor(node: Primitive, confidence?: number);
    protected getContext(): ParsedElContext[];
}
