import ISelectorGeneratorStrategy from "@/hierarchyData/ISelectorGeneratorStrategy";
import HierarchyDataNode from "@/hierarchyData/HierarchyDataNode";
import Selector from "@/hierarchyData/Selector";
export default class UpDownSelectorsCombinationsGenerator implements ISelectorGeneratorStrategy {
    private readonly useParentsTexts;
    private readonly minSelectorsLevelToStop;
    private readonly maxPercentOfAnyAttributes;
    private readonly doc;
    constructor(doc?: Document);
    generate(hierarchyDataTargetNode: HierarchyDataNode, onlyCss?: boolean, maxSelectors?: number, minUniqueSelectors?: number, speedFactor?: number): Selector[];
    private createNewSelectorsCombinations;
    private removeRedundantSelectors;
    private getBestSelectors;
    private removeDuplicateSelectors;
}
