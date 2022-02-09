import { Primitive } from "./primitive";
import { ParsedElement } from "./ParsedElement";
import { ParsedElContext } from "./parsedData/ParsedElContext";
export declare class HeaderElement extends ParsedElement {
    icon: Primitive | null;
    heading: Primitive;
    subHeading: Primitive | null;
    constructor(heading: Primitive, wrapper: Primitive, confidence?: number);
    protected getDataForContextHash(): (string | null | undefined)[];
    protected getContext(): ParsedElContext[];
}
