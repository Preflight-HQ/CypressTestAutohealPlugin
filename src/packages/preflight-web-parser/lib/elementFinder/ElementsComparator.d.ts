import { ParsedTargetFlat } from "../models/parsedData/ParsedTargetFlat";
import { SearchResult } from "./SearchResult";
export default class ElementsComparator {
    constructor(patternEl: ParsedTargetFlat, minMatch?: number);
    patternEl: ParsedTargetFlat;
    minMatch: number;
    private readonly invalidResultElementTypes;
    findSimilarElements(elsToCompare: ParsedTargetFlat[]): Promise<SearchResult[] | null>;
}
