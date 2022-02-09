export declare class SentenceComparatorResult {
    similarity: number;
    query: string;
    queryIndex: number;
    result: string;
    resultIndex: number;
    constructor(query: string, queryIndex: number, result: string, resultIndex: number, similarity?: number);
}
