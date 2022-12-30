/// <reference types="cypress" />

const sizes = [[1920, 1080]]
// const sizes = ['iphone-6', 'ipad-2',[1920, 1080]]

describe("Submitting a new smook", ()=> {
    sizes.forEach((size) => {
        it(`open URL in ${size} size`, () => {
            if (Cypress._.isArray(size)) {
                cy.viewport(size[0], size[1])
                cy.login_valid_username_password('09150560098','111111');
                cy.set_address_api('3241643');
                cy.cart_close_limit_and_shipping_fee('100000');
                cy.select_supermarket();
                cy.select_shop();
                cy.select_amazing_product();
                cy.select_simple_product();
                cy.assert_product_mode_desktop();
                cy.payment('C83D40265BDC67');
            } else {
                cy.viewport(size)
                cy.login_valid_username_password('09150560098','111111');
                cy.set_address_api('3241643');
                cy.select_supermarket();
                cy.select_shop();
                cy.select_amazing_product();
                cy.assert_product_mode_mobile_tablet();
                // cy.payment();
            }
        });
    })
})
