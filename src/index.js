import ElementFinder from './helpers/ElementFinder';
import {first, sleepAsync} from './helpers/globalHelpers';
import PreflightGlobalStore from './PreflightGlobalStore';
import {dragAndDrop} from './helpers/commandHelpers';
import OpenEmailCommand from './commands/OpenEmailCommand';
import CloseEmailCommand from './commands/CloseEmailCommand';
import loggerService from './helpers/loggerService';
import GetElementCommand from './commands/GetElementCommand';
import variablesProcessor from './helpers/variablesProcessor';

beforeEach(function() {
  PreflightGlobalStore.initialize();
});

Cypress.Commands.add('initializeAutoheal', (autohealTestDataId) => {

  if(!PreflightGlobalStore.autohealApiToken){
    PreflightGlobalStore.autohealApiToken = Cypress.env('PREFLIGHT_TEST_AUTOHEAL_API_TOKEN') || Cypress.PreflightAutohealApiToken || process.env.PREFLIGHT_AUTOHEAL_API_TOKEN
  }
  PreflightGlobalStore.state.currentTestId = autohealTestDataId;
});

Cypress.Commands.overwrite('type', (originalFn, element, value, options) => {
  if(value == '{{generate.email}}'){
    value = variablesProcessor.generatedEmail;
  }
  return originalFn(element, value, options);
})

Cypress.Commands.overwrite('get', (originalFn, selector, optionsOrActionId, possibleActionId = null) => {
  let isOptionsActionId = typeof optionsOrActionId === 'number' || typeof optionsOrActionId === 'string';
  let actionId = isOptionsActionId ? optionsOrActionId :  possibleActionId;
  let getOptions = isOptionsActionId ? {} :  optionsOrActionId;
  let testTitle = Cypress.mocha.getRunner().suite.ctx.test.title;
  let doc = cy.state('window').document;

  return new Cypress.Promise(async (resolve, reject) => {
    try {
      await sleepAsync(100);
      let getCommand = new GetElementCommand(doc, selector, getOptions, actionId, testTitle);
      if(await getCommand.canBeHandledWithOriginalGet()) {
        return resolve(originalFn(selector, getOptions));
      }
      resolve(await getCommand.process());
    } catch (e) {
      reject(e.message);
    }
  });
})

function log(name, message, el = null, options = null) {
  if(options && !options.log === false){
    return;
  }
  Cypress.log({name, message, $el:el });
}

Cypress.Commands.add('autohealReport', () => {
  let reportData = PreflightGlobalStore.state.testReport;
  if(!reportData || reportData.length <= 0){
    return;
  }
  let position = 1;
  reportData.forEach(t => {
    let out = `${position}. Action (${t.actionId}) replace selector '${t.originalSelector}' with '${t.newSelector}'\n`;
    position++;
    log('update request', out)
  });

});

Cypress.Commands.add('openEmail', (subject, timeout = 30000) => {
  let openEmailCommand = new OpenEmailCommand(cy.state('window').document);
  return new Cypress.Promise(async (resolve, reject) => {
    try {
      await openEmailCommand.process(subject, timeout);
    } catch (e) {
      reject(e.message);
      return;
    }
    resolve();
  });
});

Cypress.Commands.add('closeEmail', () => {
  let closeEmailCommand = new CloseEmailCommand(cy.state('window').document);
  return new Cypress.Promise(async (resolve, reject) => {
    try {
      await closeEmailCommand.process();
    } catch (e) {
      reject(e.message);
      return;
    }
    resolve();
  });
});

Cypress.Commands.add('dragAndDrop', (dragSelector, dropSelector) => {
  return new Cypress.Promise(async (resolve, reject) => {
    let elFinder = new ElementFinder(cy.state('window').document, Cypress);
    await sleepAsync(100);
    if(!await elFinder.isElOnPage(dragSelector)){
      reject('Drag element not found');
      return;
    }
    if(!await elFinder.isElOnPage(dropSelector)){
      reject('Drop element not found');
      return;
    }
    let dragEl = elFinder.getFirstElement(dragSelector);
    let dropEl = elFinder.getFirstElement(dropSelector);
    let doc = cy.state('window').document;
    dragAndDrop(dragEl, dropEl, doc);
    log('drag&drop', `${dragSelector} => ${dropSelector}`, dragEl)
    resolve()
  });

});
loggerService.log = log;





