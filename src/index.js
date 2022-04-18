import ElementFinder from './helpers/ElementFinder';
import {escapeRegExp, sleepAsync} from './helpers/globalHelpers';
import PreflightGlobalStore from './PreflightGlobalStore';
import {dragAndDrop} from './helpers/commandHelpers';
import OpenEmailCommand from './commands/OpenEmailCommand';
import CloseEmailCommand from './commands/CloseEmailCommand';
import loggerService from './helpers/loggerService';
import GetElementCommand from './commands/GetElementCommand';
import variablesProcessor from './helpers/variablesProcessor';
import BaseRequestService from './APIs/baseRequestService';
import 'cypress-file-upload';
import 'cypress-plugin-tab';

beforeEach(async function() {
  PreflightGlobalStore.initialize();
});

before(function() {
  PreflightGlobalStore.fixedFiles = [];
  PreflightGlobalStore.testsStart = new Date();
});

Cypress.Commands.add('initializeAutoheal', (autohealTestDataId) => {

  if(!PreflightGlobalStore.ApiKey){
    PreflightGlobalStore.ApiKey = Cypress.env('PREFLIGHT_API_KEY') || Cypress.PreflightApiKey || process.env.PREFLIGHT_API_KEY
  }
  PreflightGlobalStore.state.currentTestId = autohealTestDataId;
});

Cypress.Commands.overwrite('type', (originalFn, element, value, options) => {
  return new Cypress.Promise(async (resolve, reject) => {
    try {
      if(!element){
        reject('Element cannot be null.');
      }
      value = await variablesProcessor.replaceVariables(value);
      resolve(originalFn(element, value, options))
    } catch(e){
      reject(e.message);
    }
  });
})

Cypress.Commands.overwrite('should', (originalFn, element, chainer, value) => {
  return new Cypress.Promise(async (resolve, reject) => {
    try {
      value = await variablesProcessor.replaceVariables(value);
      resolve(originalFn(element, chainer, value))
    } catch(e){
      reject(e.message);
    }
  });
});

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
      let element = await getCommand.process();
      if(!element){
        reject('Element not found.');
      }
      resolve(element);
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

Cypress.Commands.add('autoheal', () => {
  let reportData = PreflightGlobalStore.state.testReport;
  if (!reportData || reportData.length <= 0) {
    return;
  }
  let position = 1;
  reportData.forEach(t => {
    let out = `${position}. Action (${t.actionId}) replace selector '${t.originalSelector}' with '${t.newSelector}'\n`;
    position++;
    log('update request', out)
  });
  let testFile = Cypress.mocha.getRunner().test.invocationDetails.absoluteFile;
  let fixedFileName = testFile + `_fixed(${PreflightGlobalStore.testsStart.toISOString().slice(0, 19).replaceAll(':', '-')})`;
  // let dotIndex = testFile.lastIndexOf('.');
  // let testFileArray = testFile.split('');
  // testFileArray.splice(dotIndex, 0, `_fixed(${PreflightGlobalStore.testsStart.toISOString().slice(0, 19).replaceAll(':', '-')})`);
  // let fixedFileName = testFileArray.join('');

  
  if (PreflightGlobalStore.fixedFiles[testFile]) {
    PreflightGlobalStore.fixedFiles[testFile] = replaceSelectorsInTests(PreflightGlobalStore.fixedFiles[testFile], reportData);
    writeFile(fixedFileName, PreflightGlobalStore.fixedFiles[testFile])
  } else {
    cy.readFile(testFile)
      .then(file => {
        PreflightGlobalStore.fixedFiles[testFile] = replaceSelectorsInTests(file, reportData);
        writeFile(fixedFileName, PreflightGlobalStore.fixedFiles[testFile])
          .catch(e => {
            log('autoheal failed', `Cannot update file ${testFile}. Error: ${e.message}`)
          })
      })
  }
});

function replaceSelectorsInTests(fileContent, reportData){
  reportData.forEach(t => {
    let oldSelector = escapeRegExp(t.originalSelector);
    let pattern = String.raw`cy\.initializeAutoheal\('${PreflightGlobalStore.state.currentTestId}'\).*cy\.get\('(${oldSelector})', ${t.actionId}\)`;
    const regex = new RegExp(pattern, 'gms')
    fileContent = fileContent.replace(regex, (g0, g1, position) => {
      return g0.replace(g1, t.newSelector)
    });
  });
  return fileContent;
}

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
BaseRequestService.RequestFunction = (method, url, data, responseType, contentType, accessToken) => {
  return new Cypress.Promise((resolve, reject) => {
    Cypress.backend('http:request', {
      method,
      url,
      auth: accessToken ? { bearer: accessToken } : null,
      log: false,
      headers: {
        "Content-Type": contentType
      },
      encoding: responseType == 'blob' ? 'binary' : 'utf8',
      body: data
    }).then(result => {
      if(result.status >= 200 && result.status < 300 ) {
        resolve(result)
      } else {
        reject(result)
      }
    })
  });
}

function writeFile(fileName, contents){
  log('writeFile', fileName);
  return new Promise((resolve, reject)=> {
    Cypress.backend('write:file', fileName, contents, {encoding: 'utf8', flag: 'w' })
      .then(({ filePath, contents }) => {
        resolve(filePath)
      })
      .catch(e => reject(e));
  })

}





