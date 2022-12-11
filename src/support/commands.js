// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands

//*********************************************
Cypress.Commands.add('getText', (locator) => {

    /** Get element and Return element text.
     * Params: locator [String]
     * Return: [String] */

    cy.get(locator).invoke('text').as('Text');
})
//************************************************************************
Cypress.Commands.add('set_address', () => {

    /** Set Default Address.
     * Return: Status Code: 200 */

    cy.request('POST', 'https://demo-dknow-api.digikala.com/address/3241461/set-default/').then((response) => {
        expect(response).property('status').to.equal(200)
    })
})
// ***********************************************
Cypress.Commands.add('login_valid_username_password', (username, password) => {

    /** Get valid username and password.
     * Params: username [Int], password [Int]
     * Return: Login */

    username = username || Cypress.env('username');
    password = password || Cypress.env('password');

    // localStorage.clear()
    cy.visit('');
    cy.contains('button','ورود / عضویت').should('exist').click()
    cy.get('input[name="phone"]').type(username,{delay:100});
    cy.contains('button', "ادامه").click();
    cy.url().should('include', '/login').wait(1000)
    cy.get('input[data-testid="USER_LOGIN_PHONE_VERIFICATION_INPUT"]').click()
        .type(`${password}`,{delay:100});
    cy.url().should('eq', 'https://demo.digikalajet.com/')
});
// ***********************************************
Cypress.Commands.add('select_supermarket', () => {

    /** Select supermarket category.
     * Return: assert "not empty supermarket" */

    cy.request({
        method: "POST",
        url: `${Cypress.env('API_BASE')}/user/main-page/`,
    }).then((response) => {
        expect(response).property('status').to.equal(200);
    });
    cy.intercept('GET','**/search/shop/?near=1&withHeader=1&business=supermarket&q=').as('supermarket')
    cy.get('a[href="/search?onlyShops=1&near=1&withHeader=1&business=supermarket"]').click({force:true})
    cy.wait('@supermarket').its('response.body.data.header_result').should('not.be.empty')
})
// ***********************************************
Cypress.Commands.add('select_shop',() => {

    /** Select shop and protein category.
     * Return: assert "not empty shop" and existence of a protein category. */

    cy.intercept('GET','**/shop/*/').as('getShop')
    cy.get('a[data-testid^="SHOP_CART_HORIZONTAL"]').eq(0).click({force:true}) // انتخاب شاپ
    cy.wait('@getShop').its('response.body.data.body.widgets').should('not.be.empty')
        // cy.intercept('GET','**/products/').as('getProduct')
        // cy.contains("p", "پروتئینی").eq(0).click({force: true}) // انتخاب کتگوری پروتئینی
        // cy.wait('@getProduct').its('response.statusCode').should('eq',200)
        // cy.contains("پروتئینی")
})
//************************************************
Cypress.Commands.add('select_amazing_product', () => {

    /** Choose one Amazing Product.
     * Return: Add Product */

    cy.get('img[class=" ls-is-cached lazyloaded"]').eq(0).parents('a[class="Link_Link__8dg3k"]').within( () => {
        cy.intercept('POST','https://demo-dknow-api.digikala.com/cart/add/').as('addProduct')
        cy.get('div[data-cro-id="add-to-cart"]').click({force: true})
    })
})
//************************************************
Cypress.Commands.add('select_simple_product', () => {

    /** Choose one Simple Product.
     * Return: Add Product */

    cy.get('div[class="mb-16"]>div').eq(1).within( () => {
        cy.intercept('POST','https://demo-dknow-api.digikala.com/cart/add/').as('addProduct')
        cy.get('div[data-cro-id="add-to-cart"]').eq(0).click({force:true})
    })
})
//************************************************
Cypress.Commands.add('assert_product_desktop', () => {

    /** Assert one Product in Desktop mode.
     * Return: assert "not empty basket".
     * Compare its text.
     * Close the Order. */

    cy.wait('@addProduct').its('response.body.data.cart_shipment.cart_items.items').should('not.be.empty').then(() => {
        cy.getText('span[class="absolute d-flex ai-center jc-center text-caption-strong  Icon_Icon__count__27SHD border ' +
            'border-2 color-icon-low-emphasis bg-000 border-icon-low-emphasis"]').then( Text => {
            cy.getText('div[class*=Quantity_Quantity__count]').then( CountOfGoods => {
                assert(CountOfGoods, Text)
            })
        })
    })
    cy.get('[data-cro-id="payment_button"]').click() //دکمه تکمیل سفارش
})
//************************************************
Cypress.Commands.add('assert_product_mobile_tablet', () => {

    /** Assert one Product in Mobile or Tablet mode.
     * Return: assert "not empty basket".
     * Close the Order. */

    cy.wait('@addProduct').its('response.body.data.cart_shipment.cart_items.items').should('not.be.empty').then(() => {
        cy.get('div[data-cro-id="view_cart_button_shop"]').click()
    })
    cy.get('[data-cro-id="payment_button"]').click() //دکمه تکمیل سفارش
})
//************************************************
Cypress.Commands.add('payment', () => {

    /** Close Basket and Payment.
     * Return: Show Factor. */

    cy.intercept('**/shipping/*').as('getShipping')
    cy.wait('@getShipping').then(() => {
        cy.contains('div','ادامه').click()
    })
    cy.get('[data-value="5"] > .w-24').click()
    cy.get('.grow-0-lg > .d-inline-block > .relative').click({force:true})
    cy.contains('div', 'پیگیری سفارش').click({force:true})

});
//************************************************************
//valid username and password
// Cypress.Commands.add('login_valid_username_password', (username, password) => {
//     username = username || Cypress.env('username');
//     password = password || Cypress.env('password');
//
//     cy.session([username, password], () => {
//         cy.visit("user/address");
//         cy.contains('button','ورود / عضویت').click()
//         cy.get('input[name="phone"]').type(username);
//         cy.contains('button', "ادامه").click();
//         cy.url().should('include', '/login').wait(1000)
//         cy.get('input[data-testid="USER_LOGIN_PHONE_VERIFICATION_INPUT"]').click()
//             .type(`${password}{enter}`).wait(2000);
//         cy.url().should('eq', 'https://demo.digikalajet.com/')
//     });
// });
//*******************************************************************************
Cypress.Commands.add('login_insert_wrong_username', (username) => {

    /** Get invalid username and show bug report and not login.
     * Params: username [Int, String]
     * Return: Bug report [String] */

    cy.visit("user/address");
    cy.contains('button','ورود / عضویت').click()
    cy.get('input[name="phone"]').type(username);
    cy.contains('button', "ادامه").click();
    cy.contains('لطفا شماره تلفن خود را به طور صحیح وارد کنید')
    cy.url().should('eq', 'https://demo.digikalajet.com/user/login')
});
//*********************************************************************************
Cypress.Commands.add('login_insert_wrong_password', (username,password) => {

    /** Get valid username and invalid password.
     * Show bug report and not login.
     * Params: Username [Int], Password [Int, String]
     * Return: Bug report [String] */

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
Cypress.Commands.add('login_insert_without_password', (username) => {

    /** Get valid username and without password.
     * Show bug report and not login.
     * Params: Username [Int], Password [Null]
     * Return: Bug report [String] */

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
//******************************************************************************
// test api
Cypress.Commands.add('cart_close_limit', (limit) => {
     cy.request({
         method: "POST",
         url: 'https://demo-dknow-api.digikala.com/admin/shop/item/49/?_back=http://demo-dknow-api.digikala.com/admin/shop/?city%3D%26city_id%3D0%26crud_tab_id%3D%26district_id%3D0%26hash_id%3D%26id%3D%26merchant_id%255B0%255D%3D2%26name%3D%26radius%3D%26status%3D',
         form: true,
         body: { cart_close_limit: limit },
        }).then((response) => {
         expect(response).property('status').to.equal(200);
        });
});
// function form_request(method, url, formData, done) {
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', 'https://demo-dknow-api.digikala.com/admin/shop/item/49/?_back=http://demo-dknow-api.digikala.com/' +
//         'admin/shop/?city%3D%26city_id%3D0%26crud_tab_id%3D%26district_id%3D0%26hash_id%3D%26id%3D%26merchant_id' +
//         '%255B0%255D%3D2%26name%3D%26radius%3D%26status%3D');
//     // xhr.setRequestHeader(
//     //     "Authorization",
//     //     "Basic YWRtaW46YWRtaW4="
//     // );
//     xhr.onload = function () {
//         done(xhr);
//     };
//
//     xhr.onerror = function () {
//         done(xhr);
//     };
//
//     xhr.send(formData);
// }



// Cypress.Commands.add('cart_close_limit', () => {
//     const url = 'https://demo-dknow-api.digikala.com/admin/shop/item/49/?_back=http://demo-dknow-api.digikala.com/' +
//         'admin/shop/?city%3D%26city_id%3D0%26crud_tab_id%3D%26district_id%3D0%26hash_id%3D%26id%3D%26merchant_id' +
//         '%255B0%255D%3D2%26name%3D%26radius%3D%26status%3D';
//     const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
//     cy.readFile("./fixtures/uploadBlob.txt", "utf-8").then(fixture => {
//
//     })
//     cy.fixture(data, "binary")
//         .then((excelBin) => Cypress.Blob.binaryStringToBlob(excelBin, fileType))
//         .then((blob) => {
//             const formData = new FormData();
//             formData.set('file', blob, data);
//             formData.set('input2', 'input_content2');
//             form_request('POST', url, formData, function (response) {
//                 expect(response.status).to.eq(200);
//             })
//         });


    // cy.request('POST', 'https://demo-dknow-api.digikala.com/admin/shop/item/49/?_back=http://demo-dknow-api.digikala.com/' +
    //     'admin/shop/?city%3D%26city_id%3D0%26crud_tab_id%3D%26district_id%3D0%26hash_id%3D%26id%3D%26merchant_id' +
    //     '%255B0%255D%3D2%26name%3D%26radius%3D%26status%3D',{cart_close_limit: 50000}).then((response) =>{
    //     expect(response).property('status').to.equal(200)
    // })
// })
