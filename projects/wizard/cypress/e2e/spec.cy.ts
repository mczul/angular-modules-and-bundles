describe('Smoke tests', () => {
  describe('routing', () => {
    it('must redirect to first process for root path', () => {
      cy.visit('/');
      cy.url().should('include', '/first');
      cy.get('h2').contains('First process');
    });
  });

  describe('first process', () => {
    it('must prevent navigation to second step if first step is not yet valid', () => {
      cy.visit('/first');
      cy.get('#username').type('max.mustermann@gmx.de', {delay: 150});
      cy.get('#firstName').type('Max', {delay: 150});
      cy.get('#lastName').type('Mustermann', {delay: 150});

    });
  });

})
