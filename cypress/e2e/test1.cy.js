/// <reference type = "cypress"/>

describe('Suite 1', function (){
  it('flytoday', function () {
    cy.visit("https://betademo.flytoday.ir")

    cy.get('[data-test="originSelectBox"]').eq(1)
        .click({force: true})
    cy.get('input[class*="searchInput"]').type("mashhad", {force: true})
    cy.contains('فرودگاه مشهد').click({force: true})
    cy.get('input[class*="searchInput"]').eq(1).type("tehran", {force: true})
    cy.contains('فرودگاه مهرآباد').click({force: true})
    cy.get('div[data-test="startDatePicker"]').eq(1).click({force: true})
    cy.get('[class^="day_today_"]').parent().parent().parent().next().last()
        .children('button[data-test="datePickerDay"]').click({force: true})
    cy.contains('تایید').click({force: true})
    cy.get('button[data-test="flightSearchBtn"]').last().click({force: true})
  })
})