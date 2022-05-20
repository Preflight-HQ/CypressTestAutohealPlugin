import {sleepAsync} from './helpers/globalHelpers';
import GetElementCommand from './commands/GetElementCommand';
import loggerService from './helpers/loggerService';
import PreflightGlobalStore from './PreflightGlobalStore';

loggerService.log = (n, m, e, o) => {console.log(n + ' ' + m + ' ' + ' ' + o, e)}

async function pfGetElement(doc, selector, elementId, getOptions, testTitle){
  await sleepAsync(100);
  let getCommand = new GetElementCommand(doc, selector, getOptions, elementId, testTitle);
  let element = await getCommand.process();
  if(!element){
    return null;
  }
  return(element);
}

async function pfGetElementSelenium(resolve, selector, elementId, getOptions, testTitle){
  let result = await pfGetElement(document, selector, elementId, getOptions, testTitle)
  resolve(result);
}

window.pfGetElementSelenium = pfGetElementSelenium;
window.pfGetElement = pfGetElement;
window.pfAutohealInitialized = true;
