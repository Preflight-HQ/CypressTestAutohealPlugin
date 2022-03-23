import PfElement from "@/models/PfElement";
import SelectorAttribute from "@/hierarchyData/SelectorAttribute";
export default class HierarchyDataNode {
    level: number;
    element: PfElement;
    parent: HierarchyDataNode;
    children: HierarchyDataNode[];
    leftSiblings: HierarchyDataNode[];
    rightSiblings: HierarchyDataNode[];
    selectorsAttributes: SelectorAttribute[];
    constructor(pfEl: PfElement, level: number);
    get allElements(): HierarchyDataNode[];
    initializeWithSurroundingNodes(): void;
}
