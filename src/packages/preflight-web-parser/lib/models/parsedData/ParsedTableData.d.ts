import { ElementType } from "../../types/enums/ElementType";
import { ParsedElementData } from "./ParsedElementData";
export declare class ParsedTableData extends ParsedElementData {
    headerColumns: string[][];
    columns: string[][];
    constructor(guid: string, type: ElementType, parent: string | undefined | null, children: string[]);
}
