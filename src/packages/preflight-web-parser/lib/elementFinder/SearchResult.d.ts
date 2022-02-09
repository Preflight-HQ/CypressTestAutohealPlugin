import { ParsedElementData } from "../models/parsedData/ParsedElementData";
import { SearchResultConfidence } from "./SearchResultConfidence";
export declare class SearchResult {
    scores: (SearchResultConfidence)[];
    elementData: ParsedElementData;
    constructor(data: ParsedElementData);
    addScore(score: SearchResultConfidence): void;
    get confidenceResult(): number;
    get wasContextAISearchApplied(): boolean;
}
