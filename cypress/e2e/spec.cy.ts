const delay = 15;

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
      cy.viewport('iphone-xr');
      cy.visit('/first');

      cy.get('#username').type('max.mustermann@gmx.de', {delay});
      cy.get('#firstName').type('Max', {delay});
      cy.get('#lastName').type('Mustermann', {delay});
      cy.get('.sm-wizard__step__button--next').click();

      cy.get('#email--0').type('info@mustermann.de');
      cy.get('#btn--add-email').click();
      cy.get('#email--1').type('max.mustermann@gmail.com');
      cy.get('#phone--0').type('+49 123 2345789');
      cy.get('#btn--add-phone').click();
      cy.get('#phone--1').type('+49 123 3453453');
      cy.get('.sm-wizard__step__button--previous').click();
      cy.get('.sm-wizard__step__button--next').click();
      cy.get('.sm-wizard__step__button--next').click();

      cy.get('#privacy').check();
      cy.get('.sm-wizard__step__button--previous').click();
      cy.get('.sm-wizard__step__button--next').click();
      cy.get('.sm-wizard__step__button--next').click();
    });
  });

})
