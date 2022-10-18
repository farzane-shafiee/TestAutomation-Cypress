// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands

// ***********************************************
//valid username and password
Cypress.Commands.add('login_valid_username_password', (username, password) => {
    username = username || Cypress.env('username');
    password = password || Cypress.env('password');

    cy.session([username, password], () => {
        cy.visit("user/address");
        cy.contains('button','ورود / عضویت').click()
        cy.get('input[name="phone"]').type(username);
        cy.contains('button', "ادامه").click();
        cy.url().should('include', '/login').wait(1000)
        cy.get('input[data-testid="USER_LOGIN_PHONE_VERIFICATION_INPUT"]').click()
            .type(`${password}{enter}`).wait(2000);
        cy.url().should('eq', 'https://demo.digikalajet.com/')
    });
});
//******************************************************************************
//insert without username
Cypress.Commands.add('login_insert_without_username', () => {
    cy.visit("user/address");
    cy.contains('button','ورود / عضویت').click()
    cy.contains('button', "ادامه").click();
    cy.contains('لطفا شماره تلفن خود را به طور صحیح وارد کنید')
    cy.url().should('eq', 'https://demo.digikalajet.com/user/login')
});
//*******************************************************************************
//insert wrong username
Cypress.Commands.add('login_insert_wrong_username', (username) => {
    cy.visit("user/address");
    cy.contains('button','ورود / عضویت').click()
    cy.get('input[name="phone"]').type(username);
    cy.contains('button', "ادامه").click();
    cy.contains('لطفا شماره تلفن خود را به طور صحیح وارد کنید')
    cy.url().should('eq', 'https://demo.digikalajet.com/user/login')
});
//*********************************************************************************
//insert wrong password
Cypress.Commands.add('login_insert_wrong_password', (username,password) => {
    cy.visit("user/address");
    cy.contains('button','ورود / عضویت').click()
    cy.get('input[name="phone"]').type(username);
    cy.contains('button', "ادامه").click();
    cy.url().should('include', '/login').wait(1000)
    cy.get('input[data-testid="USER_LOGIN_PHONE_VERIFICATION_INPUT"]').click()
        .type(`${password}{enter}`);
    cy.contains('کد وارد شده صحیح نیست یا مدت اعتبار کد تمام شده‌است.');
    cy.url().should('eq', 'https://demo.digikalajet.com/user/login')
});
//*********************************************************************************
//insert without password
Cypress.Commands.add('login_insert_without_password', (username) => {
    cy.visit("user/address");
    cy.contains('button','ورود / عضویت').click()
    cy.get('input[name="phone"]').type(username);
    cy.contains('button', "ادامه").click();
    cy.url().should('include', '/login').wait(1000)
    cy.contains('button', "ادامه").click();
    cy.contains('ورودی اشتباه است.');
    cy.url().should('eq', 'https://demo.digikalajet.com/user/login')
});
//*********************************************************************************
// test api
Cypress.Commands.add('login_api', (username, password) => {
    username = username || Cypress.env('username');
    password = password || Cypress.env('password');

    cy.session([username, password], () => {
        cy.request({
            method: "POST",
            url: `${Cypress.env('API_BASE')}/user/login-register/`,
            body: { username, password },
        }).then((response) => {
            console.log('login response', response);
        });
    });
});
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
