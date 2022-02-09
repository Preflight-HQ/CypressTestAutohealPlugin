import { Primitive } from "./primitive";
import { ParsedElement } from "./ParsedElement";
import { TableColumnElement } from "./TableColumnElement";
import { ParsedElContext } from "./parsedData/ParsedElContext";
import { TableElement } from "./TableElement";
import { TableRowType } from "../types/enums/TableRowType";
export declare class TableRowElement extends ParsedElement {
    columns: TableColumnElement[];
    rowType: TableRowType;
    parentTable: TableElement;
    rowIndex: number;
    constructor(node: Primitive, parentTable: TableElement, rowIndex: number, rowType?: TableRowType);
    addColumn(index: number, node: Primitive, innerElements: ParsedElement[]): void;
    protected getContext(): ParsedElContext[];
}
