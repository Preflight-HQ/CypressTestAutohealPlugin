import { Primitive } from "../models/primitive";
import { HeadingElement } from "../models/HeadingElement";
import { BaseScannerParser } from "./BaseScannerParser";
import { ParsedElement } from "../models/ParsedElement";
declare class HeadingParser extends BaseScannerParser {
    scanForElements(el: Primitive, markedElements: ParsedElement[]): HeadingElement[] | null;
}
declare const headingParser: HeadingParser;
export { headingParser };
