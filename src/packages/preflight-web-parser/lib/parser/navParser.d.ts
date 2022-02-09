import { BaseUpDownParser } from "./BaseUpDownParser";
import { Primitive } from "../models/primitive";
import { NavElement } from "../models/NavElement";
declare class NavParser extends BaseUpDownParser {
    private readonly maxHorizontalNavBarHeight;
    private readonly maxVerticalNavBarWidht;
    parseEl(el: Primitive): NavElement[] | null;
}
declare const navParser: NavParser;
export { navParser };
