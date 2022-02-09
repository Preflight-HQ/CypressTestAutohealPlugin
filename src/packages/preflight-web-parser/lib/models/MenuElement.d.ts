import { Primitive } from "./primitive";
import { ParsedElement } from "./ParsedElement";
import { ParsedElContext } from "./parsedData/ParsedElContext";
export declare class MenuElement extends ParsedElement {
    buttons: Primitive[];
    constructor(node: Primitive, confidence?: number);
    get toString(): string;
    protected getContext(): ParsedElContext[];
}
