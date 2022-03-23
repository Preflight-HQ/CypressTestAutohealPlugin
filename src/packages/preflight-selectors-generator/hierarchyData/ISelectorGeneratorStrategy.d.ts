import HierarchyDataNode from "@/hierarchyData/HierarchyDataNode";
import Selector from "@/hierarchyData/Selector";
export default interface ISelectorGeneratorStrategy {
    generate(hierarchyDataTargetNode: HierarchyDataNode, onlyCss: boolean): Selector[];
}
