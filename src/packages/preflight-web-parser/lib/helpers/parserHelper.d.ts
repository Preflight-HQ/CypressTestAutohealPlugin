import { Primitive } from "../models/primitive";
import { ElementType } from "../types/enums/ElementType";
import { ParsedElement } from "../models/ParsedElement";
import { ParsedElementData } from "../models/parsedData/ParsedElementData";
declare class ParserHelper {
    readonly excludedTags: string[];
    readonly defaultTagsToFlatten: string[];
    isElementValid(pEl: Primitive | null, allowHidden?: boolean, allowTextNodes?: boolean): boolean;
    isTagExcluded(pEl: Primitive): boolean;
    flattenByTags(pEls: Primitive[], tags?: string[]): Primitive[];
    inclAllKeyWords(strs: string[], kws: string[]): boolean;
    findLabelText(el: Primitive, excludeInnerText?: boolean, maxLabelDistance?: number): string | null;
    private findClosestElements;
    parsedElementToData(pEl: ParsedElement): ParsedElementData[];
    findCommonParent(els: Primitive[]): Primitive | null;
    findElementsWithMaxDistance(start: Primitive, els: Primitive[], maxDistance?: number, skipElements?: Primitive[], expandingSearch?: boolean): Primitive[];
    findTopWrapper(el: Primitive, tolerableHeightExponent?: number, maxHeightChange?: number, tolerableWidthExponent?: number | null, maxWidthChange?: number | null): Primitive;
    hasCursorPointer(el: Primitive): boolean;
    isSizeTolerable(el: Primitive, width: number | null, height: number, tolerableHeightExponent?: number, maxHeightChange?: number, tolerableWidthExponent?: number, maxWidthChange?: number): boolean;
    findFirstLevelParsedElementsInDOM(sources: Primitive[], parsedElements: ParsedElement[], excludedElements: Primitive[], onlyFirstLevel?: boolean, breakOn?: ((e: ParsedElement) => boolean) | null, maxDepth?: number): ParsedElement[];
    getAllParsedElementsInSubtree(root: Primitive, markedElements: ParsedElement[]): ParsedElement[];
    findParsedChildren(root: Primitive, pfpTypes: ElementType | ElementType[], maxDepth?: number): Primitive[];
}
declare const parserHelper: ParserHelper;
export { parserHelper };
