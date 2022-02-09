import ConfidenceScore from "../models/ConfidenceScore";
export default class ConfidenceScoreManager {
    ConfidenceScores: [ConfidenceScore];
    constructor(ConfidenceScores: [ConfidenceScore]);
    get ConfidenceScore(): number;
}
