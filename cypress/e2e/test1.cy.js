/// <reference type = "cypress"/>

describe('Suite 1', function (){
  it('flytoday', function () {
    cy.visit("https://betademo.flytoday.ir").wait(2000)

    cy.get('button[data-test="originSelectBox"]').last().click({force: true})
    cy.get('input[class*="searchInput"]').type("mashhad", {force: true})
    cy.contains('فرودگاه مشهد').click({force: true})
    cy.get('input[class*="searchInput"]').last().type("tehran", {force: true})
    cy.contains('فرودگاه مهرآباد').click({force: true})
    cy.get('div[data-test="startDatePicker"]').last().click({force: true})
    cy.get('[class^="day_today_"]').closest('div.month_flexDayStyle__Sp81_').next().last()
        .children('button[data-test="datePickerDay"]').click({force: true})
    cy.contains('تایید').click({force: true})
    cy.get('button[data-test="flightSearchBtn"]').last().click({force: true})
    cy.wait(23000)
    // filtering
    cy.get('[title="ایران ایر تور"][type=checkbox]').check({force: true}).wait(2000)
    cy.get('svg[class*=visible]').then(el => {
      expect(el).to.be.visible
    })
    cy.get('[title="ایران ایر تور"][type=checkbox]').parent().parent().parent().parent()
        .children('p[class*=checkboxes-filter_countText]').then(expected_result => {
      cy.get('p[class*=filters-header_resultText__H_8rL]').then(actual_result => {
        expect(expected_result.text()).equals(actual_result.text())
      })
    })
    cy.get('div[data-test="list-filter-dialog"]').should('have.length', 1)
    cy.get('div[data-test="show-filter-dialog"]').should('have.text', 'ایران ایر تور')

  //  sorting
    cy.get('[class*=green-offer-color]').then(cheapest_expected_result => {
      const expected_result = cheapest_expected_result.text().substring(0,1)
      cy.get('[class="text-nowrap"]').contains('ارزان‌ترین').siblings('span').then(cheapest_actual_result => {
        const actual_result = cheapest_actual_result.text().substring(0,1)
        expect(expected_result).equals(actual_result)
      })
    })
  })

  it('should pass api login', function () {
    cy.request("POST","https://apidemo.flytoday.ir/User/CheckLogin", {username: '09193619468'})
        .then((data) => {
          console.log(data)
          expect(data.status).equals(200)
        })
  });

})
it.only('should ', function () {
  fetch('https://apidemo.flytoday.ir/User/CheckLogin').then((resp) => resp.json())
      .then((data) => {
        console.log("log is : " + data)
      })
});