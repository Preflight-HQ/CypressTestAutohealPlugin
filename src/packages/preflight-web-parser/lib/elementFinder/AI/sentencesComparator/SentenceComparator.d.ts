import { SentenceComparatorResult } from "./SentenceComparatorResult";
declare class SentenceComparator {
    private model;
    init(): Promise<void>;
    compare(queries: string[], vocabulary: string[]): Promise<SentenceComparatorResult[]>;
}
declare const sentenceComparator: SentenceComparator;
export default sentenceComparator;
