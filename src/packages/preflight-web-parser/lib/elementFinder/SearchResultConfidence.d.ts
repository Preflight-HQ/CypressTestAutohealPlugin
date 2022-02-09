import ConfidenceScore from "../models/ConfidenceScore";
import { ElSearchMethod } from "../types/enums/ElSearchMethod";
export declare class SearchResultConfidence {
    score: ConfidenceScore;
    type: ElSearchMethod;
    description: string;
    constructor(confidence: number, weight: number, type: ElSearchMethod, description?: string);
}
