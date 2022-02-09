import { SearchResult } from "../SearchResult";
import { ParsedElementData } from "../../models/parsedData/ParsedElementData";
export declare class BaseSearch {
    private static readonly byContextAISearchWeight;
    private static readonly byContextWeight;
    private static readonly byParentContextWeight;
    private static readonly bySiblingContextWeight;
    private static readonly contextTypesComparableByAI;
    byParentContext(results: SearchResult[], targetData: ParsedElementData, currentPageParse: ParsedElementData[], recordedParse: ParsedElementData[], maxDistance?: number): Promise<SearchResult[]>;
    bySiblingContext(results: SearchResult[], targetData: ParsedElementData, currentPageParse: ParsedElementData[], recordedParse: ParsedElementData[], maxDistance?: number): Promise<SearchResult[]>;
    private compareSiblings;
    byContext(results: SearchResult[], targetData: ParsedElementData): Promise<SearchResult[]>;
    private getSiblings;
    private getParents;
    private getParsedElementByGuid;
    private compareContexts;
}
declare const baseSearch: BaseSearch;
export { baseSearch };
