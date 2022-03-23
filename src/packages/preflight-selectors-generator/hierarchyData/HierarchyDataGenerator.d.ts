import PfElement from "../models/PfElement";
import HierarchyDataNode from "./HierarchyDataNode";
export default class HierarchyDataGenerator {
    private readonly doc;
    private readonly validAttributes;
    private usedVariables;
    private readonly maxClassesPerElement;
    private readonly mainElementTextLength;
    constructor(doc: Document, usedVariables?: string[]);
    generate(pfEl: PfElement, maxParentLevel?: number): HierarchyDataNode;
    private getSelectorsAttributes;
    private selectInContext;
    private getNodeUniqueTexts;
    private isClassGeneric;
    private removeMostRepeatingClasses;
}
