import ViewportPreset = Cypress.ViewportPreset;
import ActionableOptions = Cypress.ActionableOptions;

describe('Smoke tests', () => {
  describe('routing', () => {
    it('must redirect to first process for root path', () => {
      cy.visit('/');
      cy.url().should('include', '/first');
      cy.get('h2').contains('First process');
    });
  });


  describe('first process', () => {
    const viewPortPresets: ViewportPreset[] = [
      'macbook-16', 'macbook-15', 'macbook-13',  'macbook-11',
      'ipad-2',  'ipad-mini',
      'iphone-xr',  'iphone-x',  'iphone-6+',  'iphone-se2',  'iphone-8',  'iphone-7',  'iphone-6',  'iphone-5',  'iphone-4',  'iphone-3',
      'samsung-s10',  'samsung-note9'
    ];

    viewPortPresets.forEach(preset => {
      it(`must allow proper usage on viewport "${preset}" without any scrolling`, () => {
        const defaultActionConfig: Partial<ActionableOptions> = {scrollBehavior: false};
        cy.viewport(preset);
        cy.visit('/first');

        // -- ⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️
        cy.get('#username').type('max.mustermann@gmx.de', {...defaultActionConfig});
        cy.get('#firstName').type('Max', {...defaultActionConfig});
        cy.get('#lastName').type('Mustermann', {...defaultActionConfig});

        // -- 🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️
        cy.get('.sm-wizard__step__button--next').click();

        // -- ⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️
        cy.get('#email--0').type('info@mustermann.de', {...defaultActionConfig});
        cy.get('#btn--add-email').click(defaultActionConfig);
        cy.get('#email--1').type('max.mustermann@gmail.com', {...defaultActionConfig});
        cy.get('#phone--0').type('+49 123 2345789', {...defaultActionConfig});
        cy.get('#btn--add-phone').click(defaultActionConfig);
        cy.get('#phone--1').type('+49 123 3453453', {...defaultActionConfig});

        // -- 🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️
        cy.get('.sm-wizard__step__button--previous').click(defaultActionConfig);
        cy.get('.sm-wizard__step__button--next').click(defaultActionConfig);
        cy.get('.sm-wizard__step__button--next').click(defaultActionConfig);

        // -- ⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️⌨️
        cy.get('#privacy').should('not.be.checked').check(defaultActionConfig);

        // -- 🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️🕹️
        cy.get('.sm-wizard__step__button--previous').click(defaultActionConfig);
        cy.get('.sm-wizard__step__button--next').click(defaultActionConfig);
        cy.get('.sm-wizard__step__button--next').click(defaultActionConfig);
      });
    });

  });

})
