import { Primitive } from "./primitive";
import { ParsedElement } from "./ParsedElement";
import { TableElement } from "./TableElement";
import { ParsedElContext } from "./parsedData/ParsedElContext";
export declare class TableColumnElement extends ParsedElement {
    index: number;
    innerElements: ParsedElement[];
    isHeader: boolean;
    parentTable: TableElement;
    getInnerTexts(separator?: string): string;
    constructor(index: number, node: Primitive, innerElements: ParsedElement[], parentTable: TableElement, isHeader?: boolean);
    protected getContext(): ParsedElContext[];
}
