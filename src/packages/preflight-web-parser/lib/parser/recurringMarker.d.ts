import { BaseUpDownParser } from "./BaseUpDownParser";
import { Primitive } from "../models/primitive";
import { ButtonElement } from "../models/ButtonElement";
declare class RecurringMarker extends BaseUpDownParser {
    parseEl(el: Primitive): ButtonElement[] | null;
    getRecurringSiblings(el: Primitive, siblings: Primitive[]): Primitive[];
    classesSimilarity(elAClassList: string[], elBClassList: string[]): Number;
}
declare const recurringMarker: RecurringMarker;
export { recurringMarker };
