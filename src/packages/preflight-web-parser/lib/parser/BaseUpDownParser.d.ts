import { ElementType } from "../types/enums/ElementType";
import { ParsedElement } from "../models/ParsedElement";
import { Primitive } from "../models/primitive";
import { WebPageParserConfig } from "./WebPageParserConfig";
export declare abstract class BaseUpDownParser {
    abstract parseEl(el: Primitive, markedElements: ParsedElement[], config: WebPageParserConfig): ParsedElement[] | null;
    elementsAllowedToParse: Primitive[] | null;
    shouldSkipElement(element: Primitive, markedElements: ParsedElement[], overrideElTypes?: ElementType[]): boolean;
    isElementAlreadyParsed(element: Primitive, markedElements: ParsedElement[], overrideElTypes?: ElementType[]): boolean;
    isElementAllowed(element: Primitive): boolean;
}
