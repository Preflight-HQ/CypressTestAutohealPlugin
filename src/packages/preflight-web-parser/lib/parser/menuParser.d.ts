import { BaseUpDownParser } from "./BaseUpDownParser";
import { Primitive } from "../models/primitive";
import { MenuElement } from "../models/MenuElement";
import { RadioButtonsGroupElement } from "../models/RadioButtonsGroupElement";
declare class MenuParser extends BaseUpDownParser {
    private readonly maxButtonTextSize;
    parseEl(el: Primitive): MenuElement[] | RadioButtonsGroupElement[] | null;
}
declare const menuParser: MenuParser;
export { menuParser };
