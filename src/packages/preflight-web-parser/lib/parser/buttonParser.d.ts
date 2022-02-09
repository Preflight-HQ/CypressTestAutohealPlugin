import { ButtonElement } from "../models/ButtonElement";
import { CheckboxElement } from "../models/CheckboxElement";
import { Primitive } from "../models/primitive";
import { BaseUpDownParser } from "./BaseUpDownParser";
import { ButtonPurpose } from "../types/enums/ButtonPurpose";
import { ButtonSize } from "../types/enums/ButtonSizes";
import { ParsedElement } from "../models/ParsedElement";
import { WebPageParserConfig } from "./WebPageParserConfig";
declare class ButtonParser extends BaseUpDownParser {
    private readonly maxButtonHeight;
    private readonly buttonTags;
    private readonly excludedTypes;
    parseEl(el: Primitive, markedElements: ParsedElement[], config: WebPageParserConfig): (ButtonElement | CheckboxElement)[] | null;
    getWrapper(el: Primitive): Primitive | null;
    getPurposeOfElement(el: Primitive): ButtonPurpose;
    getButtonSizeCategory(el: Primitive): ButtonSize;
    getIsIcon(el: Primitive): boolean;
    getButtonType(el: Primitive): "icon" | "textButton" | "textLink";
}
declare const buttonParser: ButtonParser;
export { buttonParser };
