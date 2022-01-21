// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import BaseRequestService from './BaseRequestService';
import ElementFinder from './ElementFinder';

if(!Cypress.Preflight){
  Cypress.Preflight = {};
}
Cypress.Preflight.autohealApiKey = null;

Cypress.Commands.add('initializeAutoheal', (autohealTestDataId) => {
  if(!Cypress.Preflight){
    Cypress.Preflight = {};
  }
  Cypress.Preflight.apiUrl = 'https://localhost:44365/v1/';
  Cypress.Preflight.currentTestId = autohealTestDataId;
  Cypress.Preflight.tests = [];
});

Cypress.Commands.overwrite('get', (originalFn, selector, optionsOrActionId, possibleActionId = null) => {
  let actionId = typeof optionsOrActionId === 'string' ? optionsOrActionId :  possibleActionId;
  let options = typeof optionsOrActionId === 'string' ? {} :  optionsOrActionId;;
  let isSelXpath = isXpathSelector(selector);

  try {
    return cy.document()
      .then({ timeout: 20000 }, async doc => {
        await sleepAsync(500);
        // handle original function
        if(!isSelXpath && await isOnPage(selector, doc)) {
          return originalFn(selector, options);
        }
        // handle original function with xPathSelector
        if(isSelXpath){
          cy.log('Recognized xPath selector.');
          if(await isOnPage(selector, doc)){
            let newCssSelector = getCssSelectorForXpath(selector, doc);
            return originalFn(newCssSelector, options);
          }
          if(!actionId){
            throw new Error('Element was not found');
          }
        }

        if(!actionId || !Cypress.Preflight.currentTestId){
          throw new Error('Element was not found');
        }

        // handle autoheal
        cy.log(`Element not found with existing selector "${selector}". Trying to apply test autoheal data.`)
        let workingSelector = await getAutohealSelector(selector, actionId, doc);
        if(!workingSelector){
          throw new Error('Element was not found');
        }
        cy.log(`**Action fixed with the new selector: "${workingSelector}"**`)
        return originalFn(workingSelector, options);
    });
  } catch(e){
    debugger
  }
})

async function getAutohealSelector(selector, actionId, doc) {
  let requestService = new BaseRequestService(Cypress.Preflight.apiUrl);
  let requestData = {
    testName: Cypress.mocha.getRunner().suite.ctx.test.title,
    base64AuthKey: Cypress.Preflight.autohealApiKey
  }

  if(!Cypress.Preflight.tests[Cypress.Preflight.currentTestId]) {
    let autohealResponseJson = await requestService.post('Autoheal/TestData/' + Cypress.Preflight.currentTestId, requestData);
    if(!autohealResponseJson){
      return null;
    }
    let autohealResponse = JSON.parse(autohealResponseJson);
    let autohealTestData = JSON.parse(autohealResponse.dataJson);
    Cypress.Preflight.tests[Cypress.Preflight.currentTestId] = autohealTestData;
  }

  let testData = Cypress.Preflight.tests[Cypress.Preflight.currentTestId]
  let actionData = testData.actions.find(a => a.guid == actionId)?.data;

  if(!actionData){
    return  null
  }



  let actionDataSelectors = actionData.filter(ad => ad.value != selector);
  let cssSelectors = actionDataSelectors.filter(ads => ads.type.includes('css')).map(d => d.value);
  let xpathSelectors = actionDataSelectors.filter(ads => ads.type.includes('xpath')).map(d => d.value);
  let elementFinder = new ElementFinder(doc);
  elementFinder.startSearch(cssSelectors, xpathSelectors);
  await sleepAsync(2000);
  let bestResult = elementFinder.stopSearch();
  if(!bestResult){
    return null;
  }
  let workingSelector = bestResult.selector;
  if(bestResult.selectorType == 'xpathSelector') {
    let element = elementFinder.getElementByXpath(bestResult.selector);
    element = findFirstVisibleParent(element);
    workingSelector = Cypress.SelectorPlayground.getSelector(Cypress.$(element))
  }

  return workingSelector;
}

function findFirstVisibleParent(element){
  let newElement = element;
  for(let i = 0; i < 5; i++){
    if(isVisible(newElement)){
      return newElement;
    }
    newElement = newElement.parentElement;
  }
  return element;
}

function getElementsByXPath(xpath, parent = document)
{
  let results = [];
  let query = document.evaluate(xpath, parent || document,
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (let i = 0, length = query.snapshotLength; i < length; ++i) {
    results.push(query.snapshotItem(i));
  }
  return results;
}

function isXpathSelector(input){
  return input && !!input.match('^\\(*[.*]{0,1}/{1,2}')
}

function getCssSelectorForXpath(xpathSelector, doc){
  let elements = getElementsByXPath(xpathSelector, doc);
  if(elements.length <= 0){
    return null;
  }
  return Cypress.SelectorPlayground.getSelector(Cypress.$(elements[0]))
}

async function isOnPage(selector, doc, timeout = 5000){
  let endTime = Date.now() + timeout
  while(endTime > Date.now()) {
    let elements = isXpathSelector(selector) ? getElementsByXPath(selector, doc) : Cypress.$(selector);
    if(elements.length > 0 && isVisible(elements[0])){
      return true;
    }
    await sleepAsync(500);
  }
  return false;
}

function sleepAsync(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function isVisible(el) {
  let result = !(el.offsetWidth === 0 && el.offsetHeight === 0);
  return result;
}
