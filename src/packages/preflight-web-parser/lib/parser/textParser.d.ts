import { Primitive } from "../models/primitive";
import { BaseUpDownParser } from "./BaseUpDownParser";
import { TextElement } from "../models/TextElement";
import { ParsedElement } from "../models/ParsedElement";
import { WebPageParserConfig } from "./WebPageParserConfig";
declare class TextParser extends BaseUpDownParser {
    constructor();
    parseEl(el: Primitive, markedElements: ParsedElement[], config: WebPageParserConfig): TextElement[] | null;
}
declare const textParser: TextParser;
export default textParser;
