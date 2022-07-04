/* check the documentation if getting errors: https://bit.ly/3LKWTXR */
describe('test', () => {
  it('Create Account | PreFlight', () => {
    cy.viewport(1440, 900);
    cy.initializeAutoheal('hEUiFwTRiNdJ');
    cy.visit('https://app.preflight.com/get-started');
    cy.get('#a155f7c0-fbde-11ec-a800-cfe8d2e17525', 2).type('{{name.firstName}}');
    cy.get('#a1561ed0-fbde-11ec-a800-cfe8d2e17525', 3).type('{{name.lastName}}');
    cy.get('#a1566cf0-fbde-11ec-a800-cfe8d2e17525', 4).type('{{address.streetAddress}}');
    cy.get('#a156bb10-fbde-11ec-a800-cfe8d2e17525', 5).type('123456');
    cy.autoheal();
  })
});
