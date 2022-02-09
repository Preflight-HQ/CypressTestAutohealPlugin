import { Primitive } from "../models/primitive";
import SimplePath from "../pathFormatters/SimplePath";
export default class SearchResultResponseVM {
    confidence: number;
    primitive: Primitive | null;
    similarResultsCount: number;
    targetSimplePath: SimplePath | null;
    foundElementSimplePath: SimplePath | null;
    constructor(primitive: Primitive | null, confidence: number, similarResultsCount?: number, targetSimplePath?: SimplePath | null, foundElementSimplePath?: SimplePath | null);
}
