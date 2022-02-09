import { Primitive } from "./primitive";
import { ParsedElement } from "./ParsedElement";
import { ButtonPurpose } from "../types/enums/ButtonPurpose";
import { ButtonSize } from "../types/enums/ButtonSizes";
import { ParsedElContext } from "./parsedData/ParsedElContext";
export declare class ButtonElement extends ParsedElement {
    purpose: ButtonPurpose;
    wrapper: Primitive | undefined | null;
    sizeCategory: ButtonSize | undefined;
    buttonType: string;
    constructor({ node, confidence, purpose }: {
        node: Primitive;
        confidence: number;
        purpose: ButtonPurpose;
    });
    get toString(): string;
    protected getDataForContextHash(): (string | null | undefined)[];
    get relativeHref(): string | null;
    protected getContext(): ParsedElContext[];
}
