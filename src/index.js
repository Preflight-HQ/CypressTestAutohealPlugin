import ElementFinder from './helpers/ElementFinder';
import {first, sleepAsync} from './helpers/globalHelpers';
import PreflightGlobalSettings from './PreflightGlobalSettings';

Cypress.Commands.add('initializeAutoheal', (autohealTestDataId) => {

  if(!PreflightGlobalSettings.autohealApiToken){
    PreflightGlobalSettings.autohealApiToken = Cypress.env('PREFLIGHT_TEST_AUTOHEAL_API_TOKEN') || Cypress.PreflightAutohealApiToken || process.env.PREFLIGHT_AUTOHEAL_API_TOKEN
  }
  PreflightGlobalSettings.currentTestId = autohealTestDataId;
});


Cypress.Commands.overwrite('get', (originalFn, selector, optionsOrActionId, possibleActionId = null) => {
  let isOptionsActionId = typeof optionsOrActionId === 'number' || typeof optionsOrActionId === 'string';
  let actionId = isOptionsActionId ? optionsOrActionId :  possibleActionId;
  let options = isOptionsActionId ? {} :  optionsOrActionId;

  return new Cypress.Promise(async (resolve, reject) => {
    let elFinder = new ElementFinder(cy.state('window').document, Cypress)
    let doc = cy.state('window').document;
    let isSelXpath = elFinder.isXpathSelector(selector);
    const elNotFoundReject = (m) => reject('Element not found.' + ((!m || m.trim() == 'undefined') ? '' : ' '+m));

    await sleepAsync(100);
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

    if(!actionId || !PreflightGlobalSettings.currentTestId){
      elNotFoundReject();
      return;
    }

    // handle autoheal
    log('log',`Element not found with existing selector "${selector}". Trying to apply test autoheal data.`, null, options)
    let searchResult = await elFinder.findElementByAutohealData(PreflightGlobalSettings.currentTestId, actionId, doc);
    if(!searchResult){
      elNotFoundReject(elFinder.lastError);
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
  let reportData = PreflightGlobalSettings.testsReports[PreflightGlobalSettings.currentTestId];
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
  if(!PreflightGlobalSettings.testsReports[PreflightGlobalSettings.currentTestId]){
    PreflightGlobalSettings.testsReports[PreflightGlobalSettings.currentTestId] = [];
  }
  PreflightGlobalSettings.testsReports[PreflightGlobalSettings.currentTestId].push({
    actionId,
    originalSelector: selector,
    newSelector: searchResult.selector
  });
}


