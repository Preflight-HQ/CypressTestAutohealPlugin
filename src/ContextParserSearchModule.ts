// @ts-ignore
import * as JSZip from "jszip";
// @ts-ignore
import {ElementFinder, ParsedTargetTextPathGenerator, WebPageParser, WebPageParserConfig, ContextParserDataDB} from "./packages/preflight-web-parser";
import BaseRequestService from "./APIs/baseRequestService";

export default class ContextParserSearchModule {
  private document = null;
  private webParser:WebPageParser;
  private downloadedInputs = [];

  constructor(doc) {
    this.document = doc;
    let config = new WebPageParserConfig();
    config.rootElement = this.document.body;
    config.document = this.document;
    config.parseDOMTimeout = 3000;
    config.recycleParsedTokes = true;
    config.parseElementsOnlyInViewport = false;
    this.webParser = WebPageParser.BuildFromConfig(config);
  }

  async findElement(elementParserData){
    let elementFinder = new ElementFinder(elementParserData.data);
    this.webParser.parseDOM(false);
    let foundElementData = await elementFinder.findByPseudoSelector(this.webParser.parsedTreeRoot, elementParserData.target);
    let result = null;
    if(foundElementData){
      result = {
        element: foundElementData.primitive.HtmlElement,
        confidence: foundElementData.confidence,
        similarResultsCount: foundElementData.similarResultsCount,
        foundElementSimplePathJson: JSON.stringify(foundElementData.foundElementSimplePath),
        targetSimplePathJson: JSON.stringify(foundElementData.targetSimplePath),
        foundElementLocation: [this.getSimpleMessage(foundElementData.foundElementSimplePath)],
        targetLocation: [this.getSimpleMessage(foundElementData.targetSimplePath)]
      }
    }
    this.webParser.clearParserDataFromDOM();
    return result
  }

  public static async getParserDataFromUrl(url): Promise<ContextParserDataDB | null> {
    return await ContextParserSearchModule.uncompressParserData(url);
  }

  async getUncompressedParserData(dataUrl) {
    if(this.downloadedInputs[dataUrl]){
      return this.downloadedInputs[dataUrl];
    }
    let result = ContextParserSearchModule.uncompressParserData(dataUrl);
    this.downloadedInputs[dataUrl] = result;
    return result;
  }

  public static async uncompressParserData(dataUrl): Promise<ContextParserDataDB | null> {
    let result = new ContextParserDataDB(null, null, null);
    try {
      if (typeof (dataUrl) === 'string' && dataUrl.startsWith('http')) {
        let requestService = new BaseRequestService();
        let fileContentResult = await requestService.getBlob(dataUrl, false);
        let zipFile = await JSZip.loadAsync(fileContentResult);
        dataUrl = await zipFile.file('value').async('string')
      }
      let parserStepData = JSON.parse(dataUrl);
      if (!parserStepData || !parserStepData.data || parserStepData.data.length <= 0){
        return null;
      }
      if(typeof parserStepData.data[0] === 'number'){
        return null // invalid format
      } else if(parserStepData.data.data && parserStepData.data.data.length > 0 && typeof parserStepData.data.data[0] === 'number') {
        result.data = null
      } else {
        result.data = parserStepData.data;
      }
      result.target = parserStepData.target
      result.parserVersion = parserStepData.parserVersion
      return result;
    } catch(e){
      console.debug(e);
      return null;
    }
  }

  async getSimplePathFromParserData(parserData: ContextParserDataDB | null) {
    if(!parserData){
      return null;
    }
    let pathGenerator = new ParsedTargetTextPathGenerator(parserData.data);
    return pathGenerator.getSimplePathFromPseudoSelector(parserData.target)
  }

  getSimpleMessage(simplePath) {
    if(!simplePath){
      return null;
    }
    if(!simplePath.target){
      return 'No target';
    }
    let message = `${simplePath.target.type}`;
    if(simplePath.target.content){
      message += ` with text "${this.getShortString(simplePath.target.content)}"`;
    }

    if(simplePath.wrapper){
      message += ` inside ${simplePath.wrapper.type == 'box' ? 'panel' : simplePath.wrapper.type}`;
      if(simplePath.wrapper.content){
        message += `" ${this.getShortString(simplePath.wrapper.content)}"`
      }
    }

    if(simplePath.top){
      if(simplePath.top.type == 'box'){
        message += ` on${!simplePath.top.content ? ' main ' : '' } page `;
      } else {
        message += ` in ${simplePath.top.type} `;
      }
      if(simplePath.top.content) {
        message += `"${this.getShortString(simplePath.top.content)}"`;
      }
    } else {
      message += ` on main page`;
    }

    return message;
  }

  getShortString(input, maxLength = 30) {
    return `${input.substr(0, maxLength)}${input.length > maxLength ? '...' : ''}`;
  }

}
