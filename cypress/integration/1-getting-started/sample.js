import TestPage from './POMs/getBootstrap';
import LoginYourwebappPOM from './POMs/yourWebApp_login';

/* check the documentation if getting errors: https://bit.ly/3LKWTXR */
describe('test', () => {
  it('Forgot Password | YourWebApp', () => {
    cy.viewport(1440, 900);
    cy.initializeAutoheal('WKqmbGHRl9wD');
    cy.visit('https://yourweb.app/#/login');
    cy.get('.max-w>a', 2).click();
    cy.get('#pf-lesson-signup-0', 3).type('{{name.firstName}}');
    cy.get('#pf-lesson-signup-1', 4).type('{{name.lastName}}');
    cy.get('form>.flex>div:nth-child(2)', 5).click();
    cy.get('#pf-lesson-signup-2', 6).type('{{generate.email}}');
    cy.get('#pf-lesson-signup-3', 7).type('Test123');
    cy.get('.text-white', 8).click();
    cy.openEmail('Verify your email');
    cy.get('a', {iframe: '.data-box-content>iframe'}, 10).click();
    cy.closeEmail()
    cy.get('#pf-lesson-login-0', 12).type('{{generate.email}}');
    cy.get('#pf-lesson-login-1', 13).type('test123');
    cy.get('#pf-lesson-login-2', 14).click();
    cy.get('form>.text-sm', 15).should('include.text', 'Invalid email or password');
    cy.get('#pf-lesson-login-1', 16).type('Test123');
    cy.get('#pf-lesson-login-1', 17).type('{enter}');
    cy.get('.flex>.text-sm>a', 18).click();
    cy.get('.w-full', 19).type('{{generate.email}}');
    cy.get('.text-white', 20).click();
    cy.get('.text-xl', 21).should('include.text', 'We’ve sent you an email link to reset your password');
    cy.autoheal();
  })
});

/* check the documentation if getting errors: https://bit.ly/3LKWTXR */
/* check the documentation if getting errors: https://bit.ly/3LKWTXR */
// describe('test', () => {
//   it('Login | YourWebApp', () => {
//     cy.viewport(1440, 900);
//     cy.initializeAutoheal('jGNlyKROUbbe');
//     cy.visit('https://yourweb.app/#/login');
//     cy.get('#pf-lesson-login', 2).type('test');
//     cy.get('#pf-lesson-login-1', 3).type('test');
//     cy.autoheal();
//   })
// });

/* check the documentation if getting errors: https://bit.ly/3LKWTXR */
// describe('test', () => {
//   it('Login | YourWebApp', () => {
//     cy.viewport(1440, 900);
//     cy.initializeAutoheal('IaSBCkCQFSfV');
//     cy.visit('https://yourweb.app/#/login');
//     cy.get('#pf-lesson-login-0', 2).type('test@test.com');
//     cy.get('#pf-lesson-login-1', 3).type('test');
//     cy.get('#pf-lesson-login-2', 4).click();
//     cy.autoheal();
//   })
// });

// describe('POM test', () => {
//   it('File upload and sharing. Large file transfers. Free online cloud storage.', () => {
//     cy.viewport(1440, 900);
//     let pom = new LoginYourwebappPOM();
//     pom.visit();
//     pom.typeEmailAddress('test@email.com');
//     cy.autoheal();
//   })
// })
//
//
// describe('test', () => {
//   it('', () => {
//     cy.viewport(1440, 900);
//     cy.initializeAutoheal('CddNFvQr9KTh');
//     cy.get('(//ul/li[4]/button/span)[1]', undefined).click();
//     cy.get('(//span/span)[2]', undefined).click();
//     cy.get('//span[normalize-space(.)="Filter"]', undefined).click();
//     cy.get('(//span/span)[3]', undefined).click();
//     cy.get('div>[type="text"]', undefined).type('back');
//     cy.get('(//div/*/li[1]/h5)[1]', undefined).click();
//     cy.get('//span[normalize-space(.)="Backend Engineer"]', undefined).should('include.text', 'Backend Engineer');
//     cy.autoheal()
//   })
// })







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
