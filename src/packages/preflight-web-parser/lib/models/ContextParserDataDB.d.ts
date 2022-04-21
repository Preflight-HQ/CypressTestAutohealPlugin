import { ParsedElementData } from "./parsedData/ParsedElementData";
export default class ContextParserDataDB {
    data: ParsedElementData[];
    target: string;
    parserVersion: string;
    constructor(parsedData: ParsedElementData[], target: string, parserVersion: string);
}
