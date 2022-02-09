import { ParsedElement } from "../models/ParsedElement";
import { ParsedElementData } from "../models/parsedData/ParsedElementData";
import SearchResultResponseVM from "./SearchResultResponseVM";
export default class ElementFinder {
    private readonly recordedParse;
    private readonly invalidResultElementTypes;
    constructor(recordedParse: ParsedElementData[]);
    findByPseudoSelector(currentPageTreeRoot: ParsedElement, pseudoSelectorString: string): Promise<SearchResultResponseVM | null>;
    private searchElementByContext;
    private searchElementParentsByContext;
    private searchElementSiblingsByContext;
    private findInTree;
}
