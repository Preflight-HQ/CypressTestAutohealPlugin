import ElementFinder from './helpers/ElementFinder';
import {first, sleepAsync} from './helpers/globalHelpers';

const ApiUrl = 'https://localhost:44365/v1/';


if(!Cypress.Preflight){
  Cypress.Preflight = {};
}
Cypress.Preflight.autohealApiToken = null;

Cypress.Commands.add('initializeAutoheal', (autohealTestDataId) => {
  if(!Cypress.Preflight){
    Cypress.Preflight = {};
  }

  if(!Cypress.Preflight.autohealApiToken){
    Cypress.Preflight.autohealApiToken = Cypress.env('PREFLIGHT_TEST_AUTOHEAL_API_TOKEN') || process.env.PREFLIGHT_AUTOHEAL_API_TOKEN
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
        let elements = elFinder.getElementsByXPath(selector);
        log('get-xPath', selector, first(elements), options);
        resolve(elements);
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
    log('log',`Element not found with existing selector "${selector}". Trying to apply test autoheal data.`, null, options)
    let searchResult = await elFinder.findElementByAutohealData(Cypress.Preflight.currentTestId, actionId, doc);
    if(!searchResult){
      elNotFoundReject();
      return;
    }
    log('get-autoheal', searchResult.selector, searchResult.element, options);
    pushReportData(selector, actionId, searchResult);
    resolve(searchResult.element);
  });
})

function log(name, message, el = null, options = null) {
  if(options && !options.log === false){
    return;
  }
  Cypress.log({name, message, $el:el });
}

Cypress.Commands.add('autohealReport', () => {
  let reportData = Cypress.Preflight.testsReports[Cypress.Preflight.currentTestId];
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


