Cypress.Preflight.autohealApiKey = 'e2NvbXBhbnlJZDoiMSIsc2VjcmV0OiJDT205QTVlTEhCQ3U2d2QifQ==';

describe('test', () => {
  it('Login | YourWebApp', () => {
    cy.viewport(1440, 900);
    cy.initializeAutoheal('deQNPedb2bIA');
    cy.visit('https://yourweb.app/#/login');
    cy.get('input[id="pf-lesson-login-0"]', '2').type('test@test.com');
    cy.get('iut[id="pf-lesson-login-1"]', '3').type('123456');
    cy.get('input#remember_me', '4').click();
    cy.get('button', '5').click();
    cy.get('//a[@href="#/teams"]', '6').click();
    cy.get('.mt-3 > :nth-child(1) > .justify-between > .flex-1', '7').click();
    cy.get('button.max-w-xs > span.hidden', '8').click();
    cy.get('button[role="menuitem"]', '9').click();
    cy.get('div.text-sm > a', '12').should('include.text', 'Forgot your password?');
  })
})

