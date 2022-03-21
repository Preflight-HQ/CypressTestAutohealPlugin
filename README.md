# preflight-cypress-plugin

## Install with npm

```
npm install -D @preflight-hq/preflight-cypress-plugin
```
Then include in your project's `cypress/support/index.js`

```js
require('@preflight-hq/preflight-cypress-plugin')
```

## Create an account on [Preflight.com](https://app.preflight.com/get-started?afmc=cypressPlugin)
 - The API key will be generated for you automatically after creating account.
 - Alternatively you can go to [Account Settings / API](https://app.preflight.com/account/api) to generate a new one. 
 
## Set API key in your test environment
- You can set key in code like  `Cypress.PreflightApiKey = [YOUR_API_KEY];`
- Or set Cypress env in your `cypress.json` file. 

```
"env": {
  "PREFLIGHT_API_KEY": "[YOUR_API_KEY]"
 }
```

## Creating test
- Once you have the plugin installed and set up with the API key you can create your first test.
- Download Chrome extension [Cypress Recorder from Preflight](https://chrome.google.com/webstore/detail/lpfigbkckbojbjnmhapmfekljbhclhhj)
- Log in and follow instructions on the video below to create your first test. 

<img src="https://preflightuploads.blob.core.windows.net/uploads/PreflightCypressCodeGenerator.gif" alt="Create test">

### Generated code 
```
    Cypress.PreflightApiKey = [YOUR_API_KEY];
    describe('test', () => {
      it('Login | YourWebApp', () => {
        cy.viewport(1440, 900);
        cy.initializeAutoheal('BdwKWXZ6IE4R');
        cy.visit('https://yourweb.app/#/login');
        cy.get('//h2[text()=" Sign in to your account "]/..//a', 2).click();
        cy.get('#pf-lesson-signup-0', 3).type('{{name.firstName}}');
        cy.get('#pf-lesson-signup-1', 4).type('{{name.lastName}}');
        cy.get('[type="email"]', 5).type('{{generate.email}}');
        cy.get('[type="password"]', 6).type('123456');
        cy.get('div.flex-col > button[id="pf-lesson-signup-4"]', 7).click();
        cy.openEmail('Verify your email');
        cy.get('a', {iframe: 'iframe#pf-email-iframe'}, 9).click();
        cy.closeEmail()
        cy.get('//h3[descendant::text()=" Email verified successfully! "]', 11).should('include.text', 'Email verified successfully!');
        cy.get('[type="email"]', 12).type('{{generate.email}}');
        cy.get('[type="password"]', 13).type('123456');
        cy.get('//button[descendant::text()=" Sign in "]', 14).click();
        cy.get('.flex>h1', 15).should('include.text', 'Good morning, {{name.firstName[1]}} {{name.lastName[1]}}');
        cy.get('.max-w-xs', 16).click();
        cy.get('.shadow-lg>button', 17).click();
        cy.autoheal();
      })
    })    
```
