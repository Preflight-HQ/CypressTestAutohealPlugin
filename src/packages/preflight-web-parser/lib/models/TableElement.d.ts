import { Primitive } from "./primitive";
import { ParsedElement } from "./ParsedElement";
import { TableRowElement } from "./TableRowElement";
import { ParsedElContext } from "./parsedData/ParsedElContext";
export declare class TableElement extends ParsedElement {
    headingRows: TableRowElement[];
    rows: TableRowElement[];
    pagination: ParsedElement | null;
    constructor(node: Primitive, confidence?: number);
    get toString(): string;
    getHeaderLabel(index: number): string;
    protected getContext(): ParsedElContext[];
}
