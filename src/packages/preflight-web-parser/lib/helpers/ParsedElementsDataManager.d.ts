import { ParsedElementData } from "../models/parsedData/ParsedElementData";
export default class ParsedElementsDataManager {
    private parsedData;
    constructor(parsedData: ParsedElementData[]);
    get root(): ParsedElementData | null;
    get(guid: string | null | undefined): ParsedElementData | null;
}
