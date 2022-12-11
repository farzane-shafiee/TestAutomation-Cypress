/// <reference types="cypress" />

const sizes = ['iphone-6', 'ipad-2',[1920, 1080]]
// before(size)
describe("Submitting a new order", ()=> {
    sizes.forEach((size) => {
        it(`open URL in ${size} size`,() => {
            if (Cypress._.isArray(size)){
                cy.viewport(size[0],size[1])
            }else {
                cy.viewport(size)
            }
            cy.login_valid_username_password();
            cy.wait(2000)

            cy.get('a[class^="MainNewBusinessTypes"]').eq(0).click({force:true}).wait(2000)
            cy.url("https://demo.digikalajet.com/search?onlyShops=1&near=1&business=supermarket")
            cy.get('a[data-testid^="SHOP_CART_HORIZONTAL"]').eq(0).click() // انتخاب شاپ
            cy.contains("p", "پروتئینی").eq(0).click({force: true}).wait(1000) // انتخاب کتگوری پروتئینی
            cy.contains("span", "پروتئینی").should("be.visible")
            cy.get('p[class^="grow-1"]').contains("آرایشی و بهداشتی").parents('div[id^="product_carousel"]') //انتخاب بخش آرایشی و بهداشتی
                .within(row => {
                    row.children().eq(1).width( () => {
                        cy.get('[data-cro-id=add-to-cart]').eq(0).click({force:true}).wait(1000) //اضافه کردن کالا اول
                        cy.get('div[class*=Quantity_Quantity__count]').then(CountOfFirstGoods => {
                            assert(CountOfFirstGoods.text(), "۱")
                        })
                        cy.get('[data-cro-id=add-to-cart]').eq(0).click({force:true}).wait(1000) //اضافه کردن کالا دوم
                        cy.get('div[class*=Quantity_Quantity__count]').then(CountOfSecondGoods => {
                            assert(CountOfSecondGoods.text(), "۱")
                        })
                    })
                    cy.one_order('div[class*=Quantity_Quantity__count]').then( getText => {
                        cy.log('text1: ',getText)
                    })
                    cy.get('[data-cro-id="payment_button"]').click() //دکمه تکمیل سفارش

                })
        });
    })


    // it('should ', function () {
    // cy.login_valid_username_password();
    // cy.visit("/")
    // cy.get('a[class^="MainNewBusinessTypes"]').eq(1).click({force:true})
    // cy.url("https://demo.digikalajet.com/search?onlyShops=1&near=1&business=supermarket")
    // cy.get('a[data-testid^="SHOP_CART_HORIZONTAL"]').should("include.text","جت‌ مارت").eq(0).click() // انتخاب جت مارت
    // cy.contains("span", "آرایشی و بهداشتی").click({force: true}).wait(1000) // انتخاب کتگوری آرایشی و بهداشتی



    // })
    // cy.get('[data-cro-id="view_cart_button_shop"]').click()
    // cy.get('div[data-cro-id="checkout_display_cart_sheet"]').within(()=> {
    //     cy.get('div[class*=text-subtitle-strong]').should("have.text", "۱۱")
    // })


    // let $totalPrice1 = Cypress.$('span[class="text-h5-extra color-900"]').text();
    // cy.get('[data-cro-id="payment_button"]').click({force: true}).wait(2000)
    // cy.url().should("include.text", "https://demo.digikalajet.com/checkout/payment/")
    // let $totalPrice2 = Cypress.$('span[class="color-600 text-subtitle-strong"]').eq(0).text()
    // expect($totalPrice1).to.eq($totalPrice2)
    // assert($totalPrice1, $totalPrice2)
    // cy.get('label[data-value="5"]').click()

    // cy.get('span[class="text-h5-extra color-900"]').then(totalPrice1 => {
    //     cy.get('[data-cro-id="payment_button"]').click()
    //     cy.get('span[class="color-600 text-subtitle-strong"]').eq(0).then( totalPrice2 => {
    //         assert(totalPrice1.text(), totalPrice2.text())
    //         totalPrice = totalPrice1;
    //     })
    // })
    // cy.get('div[class="bg-000 px-5 py-4"]').eq(0).within(() => {
    //     cy.get('div[class*=text-subtitle-strong]').should("have.text", "۱۱")
    // })
    // cy.get('span[class="color-800 text-subtitle-strong"]').then( paymentPrice1 => {
    //     cy.get('span[class="text-h5-extra color-900"]').then( paymentPrice2 => {
    //         assert(paymentPrice1.text(), paymentPrice2.text())
    //         paymentPrice = paymentPrice1;
    //     })
    // })
    // cy.get('[data-cro-id="payment_button"]').click()
    // cy.get('label[data-value="5"]').click()
    // cy.get('span[class="color-600 text-subtitle-strong"]').eq(0).then( totalPricePayment => {
    //     assert(totalPrice,totalPricePayment.text())
    // })
    // cy.get('span[class="color-800 text-subtitle-strong"]').then( paymentPricePayment => {
    //     assert(paymentPrice, paymentPricePayment.text())
    // })
    // cy.get('span[class="text-h5-extra color-900"]').then( $payment => {
    //     assert(paymentPrice, $payment.text())
    // })
    // let $1 = Cypress.$('span[class="text-h5-extra color-900"]').text()

    // });
})
