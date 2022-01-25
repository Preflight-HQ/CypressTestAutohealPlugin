import ElementFinder from './helpers/ElementFinder';
import {sleepAsync} from './helpers/globalHelpers';

const ApiUrl = 'https://localhost:44365/v1/';


if(!Cypress.Preflight){
  Cypress.Preflight = {};
}
Cypress.Preflight.autohealApiKey = null;

Cypress.Commands.add('initializeAutoheal', (autohealTestDataId) => {
  if(!Cypress.Preflight){
    Cypress.Preflight = {};
  }
  Cypress.Preflight.apiUrl = ApiUrl;
  Cypress.Preflight.currentTestId = autohealTestDataId;
  Cypress.Preflight.tests = [];
  Cypress.Preflight.testsReports = [];
});


Cypress.Commands.overwrite('get', (originalFn, selector, optionsOrActionId, possibleActionId = null) => {
  let actionId = typeof optionsOrActionId === 'string' ? optionsOrActionId :  possibleActionId;
  let options = typeof optionsOrActionId === 'string' ? {} :  optionsOrActionId;

  return new Cypress.Promise(async (resolve, reject) => {
    let elFinder = new ElementFinder(cy.state('window').document, Cypress)
    let doc = cy.state('window').document;
    let isSelXpath = elFinder.isXpathSelector(selector);
    const elNotFoundReject = (e) => reject('Element not found');

    await sleepAsync(500);

    if(await elFinder.isElOnPage(selector)){
      if(isSelXpath){
        log('get (xPath)', selector);
        resolve(elFinder.getElementsByXPath(selector));
      } else {
        resolve(originalFn(selector, options));
      }
      return;
    }

    if(!actionId || !Cypress.Preflight.currentTestId){
      elNotFoundReject();
      return;
    }

    // handle autoheal
    log('log',`Element not found with existing selector "${selector}". Trying to apply test autoheal data.`)
    let searchResult = await elFinder.findElementByAutohealData(Cypress.Preflight.currentTestId, actionId, doc);
    if(!searchResult){
      elNotFoundReject();
      return;
    }
    log('get (Autoheal)', searchResult.selector);
    pushReportData(selector, actionId, searchResult);
    resolve(searchResult.element);
  });
})

Cypress.Commands.add('reportForTest', () => {
  let reportData = Cypress.Preflight.testsReports[Cypress.Preflight.currentTestId];
  if(!reportData || reportData.length <= 0){
    return;
  }
  let report = reportData.map(t => {
    return `Action (${t.actionId}) replace selector '${t.originalSelector}' with '${t.newSelector}'\n`;
  });
  log('report', report)
});

function pushReportData(selector, actionId, searchResult){
  if(!Cypress.Preflight.testsReports[Cypress.Preflight.currentTestId]){
    Cypress.Preflight.testsReports[Cypress.Preflight.currentTestId] = [];
  }
  Cypress.Preflight.testsReports[Cypress.Preflight.currentTestId].push({
    actionId,
    originalSelector: selector,
    newSelector: searchResult.selector
  });
}

function log(name, message){
  Cypress.log({
    name,
    message
  });
}


