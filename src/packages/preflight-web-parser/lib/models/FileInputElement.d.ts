import { ParsedElement } from "./ParsedElement";
import { Primitive } from "./primitive";
import { ParsedElContext } from "./parsedData/ParsedElContext";
export declare class FileInputElement extends ParsedElement {
    label: string | null | undefined;
    inputName: string | null | undefined;
    accept: string | null | undefined;
    coreNode: Primitive | null;
    constructor(node: Primitive, coreNode: Primitive, confidence?: number);
    get toString(): string;
    protected getContext(): ParsedElContext[];
}
