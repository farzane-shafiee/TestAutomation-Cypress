/// <reference types = "cypress"/>

describe('Suite', function () {
    it('Api test login or register phone', function () {
        cy.login_register_phone_api('09150560098')
    });
    it('Api test confirm phone', function () {
        cy.log(Cypress.env('user_id'), Cypress.env('token'))
        cy.login_confirm_phone_api('111111')
    });
    it('Api test set address', function () {
        cy.set_address_api('3241643')
    });
    it('cart_close_limit_and_shipping_fee', function () {
        cy.cart_close_limit_and_shipping_fee('100000')
    });
    it('Api test select shop', function () {
        cy.select_shop_api('113117599508')
    });
    it('Api test add cart', function () {
        cy.add_cart_api()
    });
    it('Api test shipping', function () {
        cy.shipping_api()
    });
});