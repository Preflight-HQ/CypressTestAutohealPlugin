import preflightBaseApiService from "./APIs/preflightBaseApiService";
import * as JSZip from "jszip";
import {ParsedTargetTextPathGenerator} from "preflight-web-parser";

export default class ContextParserSearch {
  private document = null;

  constructor(document) {
    this.document = document;
  }

  async getUncompressedParserData(input) {
    let result = {
      parserVersion: null,
      target: null,
      parsedData: null
    }
    try {
      if (typeof (input) === 'string' && input.startsWith('http')) {
        let fileContentResult = await preflightBaseApiService.getBlob(input);
        let zipFile = await JSZip.loadAsync(fileContentResult);
        input = await zipFile.file('value').async('string')
      }
      let parserStepData = JSON.parse(input);
      if (!parserStepData || !parserStepData.data || parserStepData.data.length <= 0){
        return null;
      }
      if(typeof parserStepData.data[0] === 'number'){
        return null // invalid format
      } else if(parserStepData.data.data && parserStepData.data.data.length > 0 && typeof parserStepData.data.data[0] === 'number') {
        result.parsedData = null
      } else {
        result.parsedData = parserStepData.data;
      }
      result.target = parserStepData.target
      result.parserVersion = parserStepData.parserVersion
      return result;
    } catch(e){
      return null;
    }
  }

  async getSimplePathFromActionData(actionDataValue) {
    let originalParsedData = await this.getUncompressedParserData(actionDataValue);
    if(!originalParsedData){
      return null;
    }
    let pathGenerator = new ParsedTargetTextPathGenerator(originalParsedData.parsedData);
    return pathGenerator.getSimplePathFromPseudoSelector(originalParsedData.target)
  }

  getSimpleMessage(simplePath) {
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
