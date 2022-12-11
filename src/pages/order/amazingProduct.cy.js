/// <reference types="cypress" />

const sizes = [[1920, 1080]]
// const sizes = ['iphone-6', 'ipad-2',[1920, 1080]]

describe("Submitting a new order", ()=> {
    sizes.forEach((size) => {
        it(`open URL in ${size} size`, () => {
            if (Cypress._.isArray(size)) {
                cy.viewport(size[0], size[1])
                cy.login_valid_username_password('09150560098','111111');
                cy.set_address();
                cy.select_supermarket();
                cy.select_shop();
                cy.select_amazing_product();
                cy.assert_product_desktop();
                // cy.payment();
            } else {
                cy.viewport(size)
                cy.login_valid_username_password('09150560098','111111');
                cy.set_address();
                cy.select_supermarket();
                cy.select_shop();
                cy.select_amazing_product();
                cy.assert_product_mobile_tablet();
                // cy.payment();
            }
        });
    })
})
