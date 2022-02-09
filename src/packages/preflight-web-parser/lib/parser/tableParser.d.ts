import { BaseUpDownParser } from "./BaseUpDownParser";
import { Primitive } from "../models/primitive";
import { TableElement } from "../models/TableElement";
import { TableColumnElement } from "../models/TableColumnElement";
import { TableRowElement } from "../models/TableRowElement";
import { ParsedElement } from "../models/ParsedElement";
declare class TableParser extends BaseUpDownParser {
    parseEl(el: Primitive, markedElements: ParsedElement[]): (TableElement | TableRowElement | TableColumnElement)[] | null;
    tryParseByTableTag(el: Primitive, markedElements: ParsedElement[]): TableElement | null;
}
declare const tableParser: TableParser;
export { tableParser };
