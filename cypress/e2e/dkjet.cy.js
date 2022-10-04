/// <reference type = "cypress"/>
describe('Suite login', function (){
    it('insert username', function () {
        cy.visit('https://digikalajet.com/user/address')
        cy.get('button[class*="Button_btn--outlined__1cUud"]')
            .children().eq(1).contains('ورود / عضویت').click()
        cy.get('[data-testid="USER_LOGIN_PHONE_INPUT"]').type('09193619468')
        cy.get('[data-testid="USER_LOGIN_PHONE_SUBMIT_BUTTON"]').click()
        cy.url().should('include', '/login').as("login").wait(1000)
        })

    it('insert OTP ', function () {
        cy.url().should('include', '/login')
        cy.get('[data-testid="USER_LOGIN_PHONE_VERIFICATION_INPUT"]').click().type('111111')
        });
    it('should login', function () {
        cy.get('color-400 text-subtitle mr-1').should('contain.text', 'فروشگاه‌های')
    });
})