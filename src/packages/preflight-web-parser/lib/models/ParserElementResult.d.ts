import { ParsedElementData } from "./parsedData/ParsedElementData";
import ContextParserDataDB from "./ContextParserDataDB";
export declare class ParserElementResult {
    parsedTreeFlat: ParsedElementData[];
    pseudoSelector: string;
    parserVersion: string;
    constructor(parsedTreeFlat: ParsedElementData[], pseudoSelector: string);
    toContextParserDataDB(): ContextParserDataDB;
}
