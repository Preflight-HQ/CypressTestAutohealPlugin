import { ParsedElementData } from "../models/parsedData/ParsedElementData";
declare class ContextSimilarityVectorGenerator {
    getSimilarityVector(parsedDataFlat: ParsedElementData[]): string;
    private getBestContextValue;
}
declare const _default: ContextSimilarityVectorGenerator;
export default _default;
