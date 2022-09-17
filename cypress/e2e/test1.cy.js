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
  })

  it.only('should pass api login', function () {
    cy.request("POST","https://apidemo.flytoday.ir/User/CheckLogin", {username: '09193619468'})
        .then((data) => {
          console.log(data)
          expect(data.status).equals(200)
        })
  });
})