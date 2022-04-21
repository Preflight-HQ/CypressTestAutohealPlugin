import { ParsedElementData } from "../models/parsedData/ParsedElementData";
import PseudoSelector from "../elementFinder/PseudoSelector";
import PathStep from "./PathStep";
import SimplePath from "./SimplePath";
export default class ParsedTargetTextPathGenerator {
    private parsedTreeFlat;
    private skippedElementTypes;
    private topElementTypes;
    constructor(parsedTreeFlat: ParsedElementData[]);
    getSimpleMessage(pseudoSelector: PseudoSelector | string, messageStart?: string): string;
    static getShortString(input: string, maxLength?: number): string;
    getSimplePathFromPseudoSelector(pseudoSelector: PseudoSelector | string): SimplePath;
    parsedElDataToText(pElData: ParsedElementData | null): PathStep | null;
    getSimpleMessageFromGuid(guid: string, messageStart?: string): string | null;
    getSimplePathFromGuid(guid: string): SimplePath | null;
    getPseudoSelectorFromGuid(guid: string): string;
}
