import { ParsedElement } from "../models/ParsedElement";
import { PomActionType } from "./enums/PomActionType";
import CyPomElementAttribute from "./CyPomElementAttribute";
import SelectorScore from "preflight-selectors-generator/SelectorScore";
import { ParserElementResult } from "../models/ParserElementResult";
import ElementAutohealData from "./ElementAutohealData";
export default class CyPomElement {
    private _guid;
    actionType: PomActionType;
    parents: CyPomElement[];
    parsedElement: ParsedElement;
    elName: string | null;
    elLevel: number;
    elIndex: number;
    simplePathMessage: string | null;
    attributesToShow: CyPomElementAttribute[];
    elementParsedData: ParserElementResult | null;
    selectors: SelectorScore[];
    constructor(parsedElement: ParsedElement, elName: string | null, actionType: PomActionType, elLevel?: number);
    get guid(): string;
    set guid(value: string);
    getAutohealData(): ElementAutohealData | null;
    get code(): string;
    private get elNameCode();
    private get cyJsDocSummary();
    private get cyGetCode();
    get functionName(): string;
}
