/// <reference types="cypress" />
// import {utilily} from './utility';

describe("Submitting a new order", ()=> {
    before(() => {
        cy.visit("https://www.w3schools.com/")
    })
    it('should ', function () {
        cy.one_order('[class="learntocodeh1"]').then( text => {
            cy.log('text1: ',text)
        })

        // cy.utilily('[class="learntocodeh1"]')
        // cy.get('@text').then( txt => {
        //     cy.log('text1: ',txt)
        // })
    })
})