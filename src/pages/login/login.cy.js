/// <reference types = "cypress"/>

describe('Suite login', function (){
    it('Api test login', function () {
        cy.login_api()
    });
    it('should valid login', function () {
        cy.login_valid_username_password('09193619468','111111');
    });
    it('should show helper "insert username" and dont login', function () {
        cy.login_insert_without_username()
    });
    it('should show helper "insert correct username" and dont login', function () {
        cy.login_insert_invalid_username('BlabBlabBlab')
    });
    it('should show helper "insert correct password" and dont login', function () {
        cy.login_insert_invalid_password('09193619468', 'qweqwe')
    });
    it('should show helper "insert password" and dont login', function () {
        cy.login_insert_without_password('09193619468')
    });
});