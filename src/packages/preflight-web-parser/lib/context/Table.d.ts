import BaseContext from "./BaseContext";
export default class TableContext extends BaseContext<HTMLTableElement> {
    columns: HTMLTableHeaderCellElement[];
    rows: HTMLTableRowElement[];
    init: () => void;
    initColumns: () => void;
    initRows: () => void;
    getCell: (el: HTMLElement) => HTMLElement | null;
    getCellData: (_el: HTMLElement) => void;
}
