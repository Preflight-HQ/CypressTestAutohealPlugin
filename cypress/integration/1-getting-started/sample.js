Cypress.PreflightAutohealApiToken = 'e2NvbXBhbnlJZDoiMSIsc2VjcmV0OiJDT205QTVlTEhCQ3U2d2QifQ==';

// describe('test', () => {
//   it('Login | YourWebApp', () => {
//     cy.viewport(1440, 900);
//     cy.initializeAutoheal('deQNPedb2bIA');
//     cy.visit('https://yourweb.app/#/login');
//     cy.get('iut[id="pf-lesson-login-0"]', 2).type('test@test.com');
//     cy.get('input[id="pf-lesson-login-1"]', 3).type('123456');
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




describe('test', () => {
  it('angularjs-dragula', () => {
    cy.viewport(1440, 900);
    cy.initializeAutoheal('QciFyOVH4k9n');
    cy.visit('http://bevacqua.github.io/angularjs-dragula/');
    cy.dragAndDrop('//div[normalize-space(.)="This is the default use case. You only need to specify the containers you want to use"]', '//div[normalize-space(.)="Moving them anywhere else isn\'t quite possible"]');
    cy.autohealReport();
  })
})



