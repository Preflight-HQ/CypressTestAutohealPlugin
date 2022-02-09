# preflight-cypress-plugin

## Install with npm

```shell
npm install -D preflight-cypress-plugin
```
Then include in your project's `cypress/support/index.js`

```js
require('preflight-cypress-plugin')
```

## Create account on https://app.preflight.com/
 - Create API key
 
## Set API key in your test environment
- You can set key in code like  `Cypress.PreflightApiKey = [YOUR_KEY];`
- Or set Cypress env in your `cypress.json` file. 

```
"env": {
  "PREFLIGHT_API_KEY": "e2NvbXBhbnlJZDoiMSIsc2VjcmV0OiJDT205QTVlTEhCQ3U2d2QifQ=="
 }
```
- For enabling advanced Preflight features, the plugin needs to communicate with the API. 
For that case you need to allow HTTP requests in your tests by adding following configuration to your `cypress.json` file.

```
  "chromeWebSecurity": false
```

## Creating test
- Once you have the plugin installed and set up with the API key you can create your first test.
- Download Chrome extension `Preflight Cypress code generator` here: https://chrome.google.com/webstore/detail/preflight-recorder/onlgiehoglnklmgeiekdpaakjkleafle
- Log in and follow instructions on the video below to create your first test. 

![Create test](https://user-images.githubusercontent.com/17752807/153217614-f1fd9cfa-7963-4af0-a814-79a3ff0d4454.gif)



### Generated code 
```
    describe('test', () => {
      it('Login | YourWebApp', () => {
        cy.viewport(1440, 900);
        cy.initializeAutoheal('BdwKWXZ6IE4R');
        cy.visit('https://yourweb.app/#/login');
        cy.get('//h2[text()=" Sign in to your account "]/..//a', 2).click();
        cy.get('//label[text()="First name"]/..//input', 3).type('{{name.firstName}}');
        cy.get('//label[text()="Last name"]/..//input', 4).type('{{name.lastName}}');
        cy.get('//label[text()="Email address"]/..//input', 5).type('{{generate.email}}');
        cy.get('//label[text()="Password"]/..//input', 6).type('123456');
        cy.get('div.flex-col > button[id="pf-lesson-signup-4"]', 7).click();
        cy.openEmail('Verify your email');
        cy.get('a', {iframe: 'iframe#pf-email-iframe'}, 9).click();
        cy.closeEmail()
        cy.get('//h3[descendant::text()=" Email verified successfully! "]', 11).should('include.text', 'Email verified successfully!');
        cy.get('//label[text()="Email address"]/..//input', 12).type('{{generate.email}}');
        cy.get('//label[text()="Password"]/..//input', 13).type('123456');
        cy.get('//button[descendant::text()=" Sign in "]', 14).click();
        cy.get('//h1[descendant::text()=" Good morning, Payton Bahringer"]', 15).should('include.text', 'Good morning, {{name.firstName[1]}} {{name.lastName[1]}}');
        cy.get('span.hidden.text-sm.font-medium', 16).click();
        cy.get('div.origin-top-right.absolute.rounded-md.shadow-lg.bg-white > button', 17).click();
        cy.autoheal();
      })
    })    
```
