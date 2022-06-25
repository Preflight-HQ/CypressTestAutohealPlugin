import TestPage from './POMs/getBootstrap';
import LoginYourwebappPOM from './POMs/yourWebApp_login';

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

// describe('test', () => {
//   it('Login | YourWebApp', () => {
//     cy.viewport(1440, 900);
//     cy.initializeAutoheal('puaecWLFgFw3');
//     cy.visit('https://yourweb.app/#/login');
//     cy.get('#pf-lesson-login', 2).type('tetet');
//     cy.get('#pf-lesson-login-0', 2).click();
//     cy.get('#pf-lesson-login-1', 3).click();
//     cy.get('#pf-lesson-login-2', 4).should('include.text', 'Sign in');
//     cy.autoheal();
//   })
// });

describe('POM test', () => {
  it('File upload and sharing. Large file transfers. Free online cloud storage.', () => {
    cy.viewport(1440, 900);
    let pom = new LoginYourwebappPOM();
    pom.visit();
    pom.typeEmailAddress('test@email.com');
    cy.autoheal();
  })
})








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
