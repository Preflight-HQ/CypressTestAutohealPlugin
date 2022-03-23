import Selector from "@/hierarchyData/Selector";
export default class SelectorScore {
    score: number;
    value: string;
    type: string;
    selector: Selector;
    constructor(type: string, value: string, score?: number, selector?: any);
}
