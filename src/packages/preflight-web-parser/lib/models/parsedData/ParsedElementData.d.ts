import { PositionData } from "./PositionData";
import { ElementType } from "../../types/enums/ElementType";
import { ParsedElContext } from "./ParsedElContext";
import { ContextType } from "../../types/enums/ContextType";
export declare class ParsedElementData {
    constructor(guid: string, type: ElementType, parent: string | undefined | null, children: string[]);
    static makeInstance(input: ParsedElementData): any;
    static readonly maxInnerTextLength: number;
    guid: string;
    type: ElementType;
    children: (string)[];
    parent: string | undefined | null;
    context: ParsedElContext[];
    rectangle: PositionData | undefined;
    contextHash: string | undefined;
    getInnerTexts(separator?: string): string;
    get innerText(): string | undefined;
    get label(): string | undefined;
    get placeholder(): string | undefined;
    get purpose(): string | undefined;
    findContext(type: ContextType): string | undefined;
    static getTextForContext(input: string): string;
}
