/// <reference type = "cypress"/>

describe('Suite login', function (){
    beforeEach(() => {
        cy.login_ui('09193619468', '111111');
    })
    beforeEach(() => {
        cy.login_api();
    })
    it('should ', function () {

    });
});