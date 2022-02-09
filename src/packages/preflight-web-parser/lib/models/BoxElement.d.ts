import { Primitive } from "./primitive";
import { ParsedElement } from "./ParsedElement";
import { ParsedElContext } from "./parsedData/ParsedElContext";
export declare class BoxElement extends ParsedElement {
    label: Primitive | undefined | null;
    heading: Primitive | undefined;
    innerElements: ParsedElement[];
    wrapperElement: Primitive | undefined | null;
    subHeading: Primitive | null;
    constructor(node: Primitive, confidence?: number);
    get toString(): string;
    protected getDataForContextHash(): (string | null | undefined)[];
    protected getContext(): ParsedElContext[];
}
