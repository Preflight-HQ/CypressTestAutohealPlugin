import PreflightGlobalStore from "./PreflightGlobalStore";
import {sleepAsync} from "./helpers/globalHelpers";
import GetElementCommand from "./commands/GetElementCommand";
import variablesProcessor from "./helpers/variablesProcessor";
import OpenEmailCommand from "./commands/OpenEmailCommand";
import CloseEmailCommand from "./commands/CloseEmailCommand";
import GetElementCommandResult from "./models/GetElementCommandResult";

class TestAutohealService {
  initialize(preflightApiKey: string) {
    PreflightGlobalStore.initialize();
    if(!PreflightGlobalStore.ApiKey){
      PreflightGlobalStore.ApiKey = preflightApiKey
    }
  }

  async findElement(doc: Document, selector: string, elementId: string, getOptions: any, testTitle: string, getElFunction: (string, any) => HTMLElement): Promise<GetElementCommandResult>{
    await sleepAsync(100);
    let getCommand = new GetElementCommand(doc, selector, getOptions, elementId, testTitle);
    if(await getCommand.doesElementExistOnPage()) {
      let el = getElFunction(selector, getOptions);
      return new GetElementCommandResult(el, selector);
    }
    let element = await getCommand.process();
    if(!element){
      throw new Error('Element not found.');
    }
    return element;
  }

  async replaceVariables(inputString: string){
    return await variablesProcessor.replaceVariables(inputString);
  }

  async openEmail(doc: Document, subject: string){
    let openEmailCommand = new OpenEmailCommand(doc)
    await openEmailCommand.process(subject);
  }

  closeEmail(doc: Document){
    let closeEmailCommand = new CloseEmailCommand(doc)
    closeEmailCommand.process();
  }

  getStore() {
    return JSON.stringify({
      state: PreflightGlobalStore.state,
      apiKey: PreflightGlobalStore.ApiKey
    });
  }

  setStore(storeJson) {
    if(!storeJson){
      return;
    }
    let store = JSON.parse(storeJson);
    PreflightGlobalStore.state = store.state;
    PreflightGlobalStore.ApiKey = store.apiKey;
  }
}

export default new TestAutohealService();
