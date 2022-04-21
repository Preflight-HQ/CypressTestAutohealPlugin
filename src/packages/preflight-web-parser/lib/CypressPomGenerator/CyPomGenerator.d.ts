import CyPom from "./CyPom";
import { WebPageParser } from "../../../src/webParserPackage";
export default class CyPomGenerator {
    private webParser;
    private readonly leaveTypes;
    private parsedTargetTextPathGenerator;
    constructor(webParser: WebPageParser);
    getPomAsync(className?: string): Promise<unknown>;
    getPOM(className?: string): CyPom;
    private getPomElements;
    private createPomElement;
    private getLabel;
    private elementName;
    private getElementContext;
    private getActionType;
    private getNodeSimplePageLocation;
    private getNodeParserData;
    private getNodeSelectors;
}
