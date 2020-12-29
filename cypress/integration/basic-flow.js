Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('BASIC FLOW', () => {
  it('VISIT HOME', () => {
    cy.visit('/dist', {});
  });
  it('FILL INPUT', () => {
    cy.get('#search-form input').type('vue', {
      force: true
    });
  });
  it('SUBMIT FORM', () => {
    cy.get('#search-button').click({ force: true });
  });
  it('CHECK IF TABLE IS VISIBLE', () => {
    cy.get('#table-results').should('be.visible');
  });
});
