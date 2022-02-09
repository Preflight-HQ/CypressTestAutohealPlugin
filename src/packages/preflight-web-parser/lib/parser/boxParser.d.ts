import { Primitive } from "../models/primitive";
import { BaseScannerParser } from "./BaseScannerParser";
import { ParsedElement } from "../models/ParsedElement";
declare class BoxParser extends BaseScannerParser {
    scanForElements(el: Primitive, markedElements: ParsedElement[]): ParsedElement[] | null;
    private findBoxesFromHeadings;
    private findAllHeadersOnPage;
    private findParsedElementsInNextSiblingsUntilNextHeader;
    private getParsedElsInHeader;
    private getHeadersForHeading;
}
declare const boxParser: BoxParser;
export { boxParser };
