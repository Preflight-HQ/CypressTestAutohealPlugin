import ConfidenceScore from "./ConfidenceScore";
export default abstract class ConfidenceCalculator {
    score: ConfidenceScore | undefined;
    abstract calculate(): ConfidenceScore;
}
