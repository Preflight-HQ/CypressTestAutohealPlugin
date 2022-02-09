import { ElementType } from "../types/enums/ElementType";
import { ParsedElement } from "../models/ParsedElement";
import { Primitive } from "../models/primitive";
export declare abstract class BaseScannerParser {
    protected markedElements: ParsedElement[];
    elementsAllowedToParse: Primitive[] | null;
    abstract scanForElements(el: Primitive, markedElements: ParsedElement[]): ParsedElement[] | null;
    protected get isParsingOnlyForTarget(): boolean;
    removeElementsToSkip(elements: Primitive[], markedElements: ParsedElement[], overrideElTypes?: ElementType[]): Primitive[];
    removeAlreadyParsedElements(elements: Primitive[], markedElements: ParsedElement[], overrideElTypes?: ElementType[]): Primitive[];
    removeNotAllowedElements(elements: Primitive[]): Primitive[];
    shouldSkipElement(element: Primitive, markedElements: ParsedElement[], overrideElTypes?: ElementType[]): boolean;
    isElementAlreadyParsed(element: Primitive, markedElements: ParsedElement[], overrideElTypes?: ElementType[]): boolean;
    isElementAllowed(element: Primitive): boolean;
}
