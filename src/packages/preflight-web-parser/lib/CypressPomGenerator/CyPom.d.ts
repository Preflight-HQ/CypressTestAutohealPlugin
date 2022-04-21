import CyPomElement from "./CyPomElement";
import ElementAutohealData from "./ElementAutohealData";
export default class CyPom {
    elements: CyPomElement[];
    name: string | null;
    private className;
    constructor(className: string);
    addElement(el: CyPomElement): void;
    toCode(): string;
    getAutohealData(): ElementAutohealData[];
    private setElementsIndexes;
}
