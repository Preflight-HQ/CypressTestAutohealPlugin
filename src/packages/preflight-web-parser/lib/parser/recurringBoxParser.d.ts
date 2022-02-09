import { Primitive } from "../models/primitive";
import { BaseUpDownParser } from "./BaseUpDownParser";
import { RecurringBoxElement } from "../models/RecurringBoxElement";
import { ParsedElement } from "../models/ParsedElement";
declare class RecurringBoxParser extends BaseUpDownParser {
    constructor();
    parseEl(el: Primitive, markedElements: ParsedElement[]): RecurringBoxElement[] | null;
}
declare const recurringBoxParser: RecurringBoxParser;
export default recurringBoxParser;
