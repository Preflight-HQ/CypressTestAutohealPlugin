import ContextParserDataDB from "../models/ContextParserDataDB";
export default class ElementAutohealData {
    parsedData: ContextParserDataDB;
    selectors: string[];
    guid: string;
    constructor(guid: string, parsedData: ContextParserDataDB, selectors: string[]);
    toJson(): string;
}
