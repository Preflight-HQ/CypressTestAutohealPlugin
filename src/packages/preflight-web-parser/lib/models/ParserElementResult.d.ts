import { ParsedElementData } from "./parsedData/ParsedElementData";
export declare class ParserElementResult {
    parsedTreeFlat: ParsedElementData[];
    pseudoSelector: string | null;
    private parserVersion;
    constructor(parsedTreeFlat: ParsedElementData[], pseudoSelector: string | null);
}
