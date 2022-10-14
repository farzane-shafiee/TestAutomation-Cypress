/// <reference type = "cypress"/>


describe("Two different URLs",  function () {
    it('should ', function () {
        cy.visit('https://demo.digikalajet.com/user/login')
        cy.get('[data-testid="USER_LOGIN_PHONE_INPUT"]').type('09193619468')
        cy.get('[data-testid="USER_LOGIN_PHONE_SUBMIT_BUTTON"]').click()
        cy.url().should('include', '/login').wait(1000)
    });

    it.only("Opens URLs", () => {
        cy.visit('http://172.30.5.12:1080')
        cy.reload().wait(2000)
        cy.get('tbody tr td').eq(2).then(element => {
            var list = element.text().split("#")
            let myOtp = list[1].substring(0,6)
            cy.task('save', myOtp)
        })
    });

    it('should ', function () {
        cy.visit('https://demo.digikalajet.com/user/login')
        cy.task('load').then((myOtp) => {
            cy.log(myOtp)
            cy.get('[data-testid="USER_LOGIN_PHONE_INPUT"]').type(myOtp) //Insert credentials
        }).wait(2000)
    });
})