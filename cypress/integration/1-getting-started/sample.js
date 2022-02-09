Cypress.PreflightApiKey = 'e2NvbXBhbnlJZDoiMSIsc2VjcmV0OiJDT205QTVlTEhCQ3U2d2QifQ==';


describe('test', () => {
  it('Dashboard | YourWebApp', () => {
    cy.viewport(1440, 900);
    cy.initializeAutoheal('ef4sspsl2YmK');
    cy.visit('https://yourweb.app/#/signup');
    cy.get('//bel[text()="First name"]/..//input', 2).type('{{name.firstName}}');
    cy.get('//label[text()="Last name"]/..//input', 3).type('{{name.lastName}}');
    cy.get('//label[text()="Email address"]/..//input', 4).type('{{generate.email}}');
    cy.get('//label[text()="Password"]/..//input', 5).type('123456');
    cy.get('div.flex-col > button[id="pf-lesson-signup-4"]', 6).click();
    cy.get('.py-8 > .flex-col', 7).should('include.text', 'We’ve sent an email to {{generate.email}}  Go and click a link there to log in.');
    cy.openEmail('Verify your email');
    cy.get('a', {iframe: 'iframe#pf-email-iframe'}, 9).click();
    cy.closeEmail()
    cy.get('//label[text()="Email address"]/..//input', 11).type('{{generate.email}}');
    cy.get('//label[text()="Password"]/..//input', 12).type('123456');
    cy.get('//button[descendant::text()=" Sign in "]', 13).click();
    cy.get('.py-6 > .flex-1 > :nth-child(1) > :nth-child(2) > div.flex > .ml-3', 14).should('include.text', 'Good morning, {{name.firstName[1]}} {{name.lastName[1]}}');
    cy.autoheal();
  })
})

// TODO better selectors generator
// TODO Admin email
// TODO Documentation
// TODO extension better handling of test save fail


// describe('test', () => {
//   it('Login | YourWebApp', () => {
//     cy.viewport(1440, 900);
//     cy.initializeAutoheal('deQNPedb2bIA');
//     cy.visit('https://yourweb.app/#/login');
//     cy.get('#lesson-login-0', 2).type('{{generate.email}}');
//     cy.get('#pf-lesson-login-0').should('include.text', '{{generate.email}}');
//     cy.get('input[id="pf-lesson-login-1"]', 3).type('{{generate.email}}');
//     cy.get('input#remember_me', 4).click();
//     cy.get('button', 5).click();
//     cy.get('//a[@href="#/teams"]', 6).click();
//     cy.get('.mt-3 > :nth-child(1) > .justify-between > .flex-1', 7).click();
//     cy.get('button.max-w-xs > span.hidden', '8').click();
//     cy.get('button[role="menuitem"]', '9').click();
//     cy.get('div.text-sm > a', '12').should('include.text', 'Forgot your password?');
//     cy.autohealReport();
//   })
// })




// describe('test', () => {
//   it('Dropzone.js', () => {
//     cy.viewport(1440, 900);
//     cy.initializeAutoheal('EBoMuvlFiM3i');
//     cy.visit('https://www.dropzone.dev/js/');
//     cy.get('//h1[descendant::text()="Try it out!"]', 2).click();
//     cy.get('input[type="file"]', 3).attachFile('testImage.jpg');
//     cy.autohealReport();
//   })
// })
//
//
// describe('test', () => {
//   it('File upload and sharing. Large file transfers. Free online cloud storage.', () => {
//     cy.viewport(1440, 900);
//     cy.initializeAutoheal('LwIfEJFSMKcE');
//     cy.visit('https://files.fm/');
//     cy.get('input[type="file"]:nth-child(3)', 2).attachFile('testImage.jpg');
//     cy.autohealReport();
//   })
// })



// describe('test', () => {
//   it('Login | YourWebApp', () => {
//     cy.viewport(1440, 900);
//     cy.initializeAutoheal('8JAljifO2ZIg');
//     cy.visit('https://yourweb.app/#/login');
//     cy.get('//h3[text()=" Sign in to your account "]/..//a', 2).click();
//     cy.get('//label[text()="First name"]/..//input', 3).type('{{hacker.noun}}');
//     cy.get('//label[text()="Last name"]/..//input', 4).type('test');
//     cy.get('//label[text()="Email address"]/..//input', 5).type('{{generate.email}}');
//     cy.get('//label[text()="Password"]/..//input', 6).type('{{generate.email}}');
//     cy.get('div.flex-col > button[id="pf-lesson-signup-4"]', 7).click();
//     cy.openEmail('Verify your email');
//     cy.get('a', {iframe: 'iframe#pf-email-iframe'}, 9).click();
//     cy.closeEmail()
//     cy.get('//h3[descendant::text()=" Email verified successfully! "]', 11).should('include.text', 'Email verified successfully!');
//     cy.autohealReport();
//   })
// })




// describe('test', () => {
//   it('angularjs-dragula', () => {
//     cy.viewport(1440, 900);
//     cy.initializeAutoheal('QciFyOVH4k9n');
//     cy.visit('http://bevacqua.github.io/angularjs-dragula/');
//     cy.dragAndDrop('//div[normalize-space(.)="This is the default use case. You only need to specify the containers you want to use"]', '//div[normalize-space(.)="Moving them anywhere else isn\'t quite possible"]');
//     cy.autohealReport();
//   })
// })
