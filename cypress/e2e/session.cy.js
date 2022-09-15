/// <reference types="cypress"/>

// it('google search', function(){
//     cy.visit("https://google.com")
//     cy.get('input[name="q"]').type("Cypress{enter}")
// })

it('check title cypress', () => {
    cy.visit("https://www.cypress.io")
    cy.title().should('eq',"JavaScript End to End Testing Framework | cypress.io testing tools")
    cy.title().should('include',"End to End Testing Frameworkp")
})