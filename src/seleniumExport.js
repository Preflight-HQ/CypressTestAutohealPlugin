import testAutohealService from './TestAutohealService';
import {ElementsSelector} from './packages/preflight-selectors-generator';
import loggerService from './helpers/loggerService';
import PreflightGlobalStore from './PreflightGlobalStore';

class SeleniumAutohealServcieExport {
  autohealTestDataId = null
  initialize(apiKey){
    loggerService.log = (n, m, e, o) => {console.log(n + ' ' + m + ' ' + ' ' + o, e)}
    testAutohealService.initialize(apiKey);
  }

  initilizeAutohealTest(autohealTestDataId){
    this.autohealTestDataId = autohealTestDataId;
    PreflightGlobalStore.state.currentTestId = autohealTestDataId;
  }

  async findElement(resolve, selector, elementId, testTitle, autohealTestDataId){
    PreflightGlobalStore.state.currentTestId = autohealTestDataId;
    let elSelector = new ElementsSelector(document)
    let result = testAutohealService.findElement(document, selector, elementId, null, testTitle, (s, o) => elSelector.getFirstElement(s))
    resolve(result);
  }

  async replaceVariables(resolve, inputString){
    let resultString = await testAutohealService.replaceVariables(inputString);
    resolve(resultString)
  }

  async openEmail(resolve, subject){
    try {
      await testAutohealService.openEmail(document, subject);
    } catch (e) {
      resolve(false)
    }
    resolve(true);
  }

  async closeEmail(resolve, ){
    await testAutohealService.closeEmail(document);
    resolve();
  }

  getStore() {
    return testAutohealService.getStore();
  }

  setStore(storeJson) {
    return testAutohealService.setStore(storeJson);
  }
}

window.preflightAutoheal = new SeleniumAutohealServcieExport();
window.pfAutohealInitialized = true;
