import { ParsedElement } from "./ParsedElement";
import { Primitive } from "./primitive";
import { InputPurpose } from "../types/enums/InputPurpose";
import { ParsedElContext } from "./parsedData/ParsedElContext";
export declare class InputElement extends ParsedElement {
    label: string | null | undefined;
    inputName: string | null | undefined;
    inputType: string | null | undefined;
    placeholder: string | null | undefined;
    purpose: InputPurpose;
    coreNode: Primitive | null;
    constructor(node: Primitive, coreNode: Primitive, purpose: InputPurpose, confidence?: number);
    get toString(): string;
    protected getDataForContextHash(): (string | null | undefined)[];
    protected getContext(): ParsedElContext[];
}
