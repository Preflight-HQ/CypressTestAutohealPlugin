import { ParsedElementData } from "./ParsedElementData";
export declare class ParsedTargetFlat {
    parsedElData: ParsedElementData[];
    guid: string;
    constructor(guid: string, parsedElData: ParsedElementData[]);
    get target(): ParsedElementData;
    get pseudoSelector(): string;
}
