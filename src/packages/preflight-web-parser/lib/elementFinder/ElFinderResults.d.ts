import { ParsedElementData } from "../models/parsedData/ParsedElementData";
import { SearchResult } from "./SearchResult";
export declare class ElFinderResults {
    private _searchResults;
    targetData: ParsedElementData;
    private readonly minResultsDistance;
    private isSorted;
    constructor(potentialParEls: ParsedElementData[], targetData: ParsedElementData);
    set searchResults(searchResults: SearchResult[]);
    get searchResults(): SearchResult[];
    get bestResult(): SearchResult | null;
    get similarResultsCount(): number;
    isResultReliable(minDistance?: number): boolean | null;
    discardUnreliableResults(minScore?: number, keepMinResultsCount?: number): SearchResult[];
    getDistanceBetweenResults(): number;
    applySearch(fn: (input: SearchResult[], targetData: ParsedElementData) => SearchResult[]): ElFinderResults;
    applySearchAsync(fn: (input: SearchResult[], targetData: ParsedElementData) => Promise<SearchResult[]>): Promise<ElFinderResults>;
    sortResults(): SearchResult[];
}
