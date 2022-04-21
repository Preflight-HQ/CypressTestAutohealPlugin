import { ParsedElement } from "../models/ParsedElement";
import { ParsedElementData } from "../models/parsedData/ParsedElementData";
import { ElFinderResults } from "./ElFinderResults";
import SearchResultResponseVM from "./SearchResultResponseVM";
export default class ElementFinder {
    private readonly recordedParse;
    private readonly invalidResultElementTypes;
    constructor(recordedParse: ParsedElementData[]);
    findByPseudoSelector(currentPageTreeRoot: ParsedElement, pseudoSelectorString: string): Promise<SearchResultResponseVM | null>;
    searchElementByContext(currentParse: ParsedElementData[], targetData: ParsedElementData, forceFullSearch?: boolean): Promise<ElFinderResults>;
    private searchElementParentsByContext;
    private searchElementSiblingsByContext;
    private findInTree;
}
