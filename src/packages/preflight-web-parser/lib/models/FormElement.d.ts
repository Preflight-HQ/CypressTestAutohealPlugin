import { Primitive } from "./primitive";
import { ParsedElement } from "./ParsedElement";
import { ButtonElement } from "./ButtonElement";
import { RadioButtonElement } from "./RadioButtonElement";
import { InputElement } from "./InputElement";
import { CheckboxElement } from "./CheckboxElement";
import { FormPurpose } from "../types/enums/FormPurpose";
import { ParsedElContext } from "./parsedData/ParsedElContext";
export declare class FormElement extends ParsedElement {
    buttons: ButtonElement[];
    inputs: InputElement[];
    radios: RadioButtonElement[];
    checkboxes: CheckboxElement[];
    submitButton: ButtonElement | undefined | null;
    purpose: FormPurpose;
    heading: string | null | undefined;
    constructor(node: Primitive, confidence?: number);
    get toString(): string;
    protected getDataForContextHash(): (string | null | undefined)[];
    protected getContext(): ParsedElContext[];
}
