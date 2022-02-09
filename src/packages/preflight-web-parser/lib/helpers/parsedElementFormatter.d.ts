import { ParsedElementData } from "../models/parsedData/ParsedElementData";
declare class ParsedElementFormatter {
    toLocationString(parsedDataFlat: ParsedElementData[], targetGuid: string | null | undefined): string;
    toLocationArray(parsedDataFlat: ParsedElementData[], targetGuid: string | null | undefined): string[];
    parsedElDataToString(pElData: ParsedElementData, parsedDataFlat: ParsedElementData[]): string | undefined | null;
    getButtonAsText(pElData: ParsedElementData): string;
    getFormElementAsText(pElData: ParsedElementData): string;
    getFormAsText(pElData: ParsedElementData): string;
    getBoxAsText(pElData: ParsedElementData, parsedDataFlat: ParsedElementData[]): string;
    getTableRowAsText(pElData: ParsedElementData, parsedDataFlat: ParsedElementData[]): string;
    getTableColumnAsText(pElData: ParsedElementData, parsedDataFlat: ParsedElementData[]): string;
    private formatLocationValue;
    private formatKeyValueContext;
}
declare const _default: ParsedElementFormatter;
export default _default;
