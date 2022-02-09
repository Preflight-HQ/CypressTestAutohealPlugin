import { Primitive } from "./primitive";
import { ParsedElement } from "./ParsedElement";
import { ParsedElContext } from "./parsedData/ParsedElContext";
export declare class HeadingElement extends ParsedElement {
    wrapper: Primitive | undefined | null;
    isSubHeading: boolean;
    constructor(el: Primitive, confidence?: number);
    protected getDataForContextHash(): (string | null | undefined)[];
    protected getContext(): ParsedElContext[];
}
