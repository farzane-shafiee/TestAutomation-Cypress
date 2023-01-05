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
    cy.get('a[href="/search?onlyShops=1&near=1&withHeader=1&business=supermarket"]').eq(0).click({force:true})
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

        cy.get('div[id="product_carousel0"]').within(() => {
            cy.intercept('POST','https://demo-dknow-api.digikala.com/cart/add/').as('addProduct')
            cy.get('div[data-cro-id="add-to-cart"]').eq(0).click({force: true})
        })
    //     cy.get('img[class=" ls-is-cached lazyloaded"]').eq(0).parents('a[class="Link_Link__8dg3k"]').within( () => {
    //     cy.intercept('POST','https://demo-dknow-api.digikala.com/cart/add/').as('addProduct')
    //     cy.get('div[data-cro-id="add-to-cart"]').click({force: true})
    // })
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
Cypress.Commands.add('assert_product_mode_desktop', () => {

    /** Assert one Product in Desktop mode.
     * Return: assert "not empty basket".
     * Compare its text.
     * Close the Order. */

    cy.get('div[class*="px-5 mt-3 grow overflow-y-auto"]').within(() => {
        cy.get('div[class*="color-s-700 text-h4"]').then( (f) => {
            cy.log("len f: ", f.length)
        })
        // let count_sidebar = cy.get('div[class*="color-s-700 text-h4"]').wrap(length)

    })
    cy.get('div[class*="ShopContainer"]').within(() => {
        cy.get('div[class*="color-s-700 text-h4"]').then((o) => {
            cy.log("len o: ", o.length)
        })
        // let count_page = cy.get('div[class*="color-s-700 text-h4"]').wrap(length)
        // assert.equal(len_sidebar.length, len_page.length)
    })
    // expect(f.length, o.length)
    // assert( f.length, o.length)
        // assert.equal('@len_page', '@len_sidebar')
        // expect('@len_page'.valueOf()).equal('@len_sidebar'.valueOf())
        // cy.wait('@addProduct').its('response.body.data.cart_shipment.cart_items.items').should('not.be.empty').then(() => {
        //     cy.get('div[class*=Quantity_Quantity__count]').should('have.length', 4)
        // })
    cy.get('[data-cro-id="payment_button"]').click() //دکمه تکمیل سفارش
})

//************************************************
    Cypress.Commands.add('assert_product_mode_mobile_tablet', () => {

        /** Assert one Product in Mobile or Tablet mode.
         * Return: assert "not empty basket".
         * Close the Order. */

        cy.wait('@addProduct').its('response.body.data.cart_shipment.cart_items.items').should('not.be.empty').then(() => {
            cy.get('div[data-cro-id="view_cart_button_shop"]').click()
        })
        cy.get('[data-cro-id="payment_button"]').click() //دکمه تکمیل سفارش
    })
//************************************************
    Cypress.Commands.add('get_text_factor_prices', () => {


        cy.get('span[class*="color-600 text-subtitle-strong"]').eq(0).then((element_total) => {
            Cypress.env('total', element_total.text());
        })
        cy.get('span[class*="color-600 text-subtitle-strong"]').eq(1).then((element_shipping_fee) => {
            Cypress.env('shipping_fee', element_shipping_fee.text());
        })
        cy.get('span[class*="color-secondary-500 text-subtitle-strong"]').then((element_discount) => {
            Cypress.env('discount', element_discount.text());
        })
        cy.get('span[class*="color-800 text-subtitle-strong"]').then((element_payable_price) => {
            Cypress.env('payable_price', element_payable_price.text());
        })
    })
//************************************************
    Cypress.Commands.add('payment', (code) => {

        /** Close Basket and Payment.
         * Return: Show Factor. */

        cy.intercept('**/shipping/*').as('getShipping')
        cy.wait('@getShipping').then(() => {
            cy.get_text_factor_prices()
            cy.contains('div', 'ادامه').click()
        })
        cy.get('[data-value="5"] > .w-24').click()

        cy.contains('کد تخفیف دارید؟').click()
        cy.get('[name="code"]').click().type(code)
        cy.get('button[class*="text-button-2 radius-md"]>div').eq(1).click()

        cy.get('span[class*="color-hint-text-success"]').should('exist')
        cy.get('i[class*="icon cube-content-edit"]').should('exist')

        cy.get('span[class*="color-600 text-subtitle-strong"]').eq(0).then((element_total) => {
            assert.equal(element_total.text(), Cypress.env('total'))
            // cy.contains(text).should('not.be.null')
        })
        cy.get('span[class*="color-600 text-subtitle-strong"]').eq(1).then((element_shipping_fee) => {
            assert.equal(element_shipping_fee.text(), Cypress.env('shipping_fee'))
        })
        cy.get('span[class*="color-secondary-500 text-subtitle-strong"]').then((element_discount) => {
            // assert.equal(element_discount.text(), Cypress.env('discount'))
            assert.isNotNaN(element_discount.text())
            // cy.contains(text).should('not.be.null')
        })
        cy.get('span[class*="color-800 text-subtitle-strong"]').then((element_payable_price) => {
            assert.equal(element_payable_price.text(), Cypress.env('payable_price'))
        })

        // cy.get('.grow-0-lg > .d-inline-block > .relative').click({force:true})
        // cy.contains('div', 'پیگیری سفارش').click({force:true})
    });
//*******************************************************************************
    Cypress.Commands.add('login_insert_invalid_username', (username) => {

        /** Get invalid username and show bug report and not login.
         * Params: username [Int, String]
         * Return: Bug report [String] */

        cy.visit("user/address");
        cy.contains('button', 'ورود / عضویت').click()
        cy.get('input[name="phone"]').type(username);
        cy.contains('button', "ادامه").click();
        cy.contains('لطفا شماره تلفن خود را به طور صحیح وارد کنید')
        cy.url().should('eq', 'https://demo.digikalajet.com/user/login')
    });
//*********************************************************************************
    Cypress.Commands.add('login_insert_invalid_password', (username, password) => {

        /** Get valid username and invalid password.
         * Show bug report and not login.
         * Params: Username [Int], Password [Int, String]
         * Return: Bug report [String] */

        cy.visit("user/address");
        cy.contains('button', 'ورود / عضویت').click()
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
        cy.contains('button', 'ورود / عضویت').click()
        cy.get('input[name="phone"]').type(username);
        cy.contains('button', "ادامه").click();
        cy.url().should('include', '/login').wait(1000)
        cy.contains('button', "ادامه").click();
        cy.contains('ورودی اشتباه است.');
        cy.url().should('eq', 'https://demo.digikalajet.com/user/login')
    });
//*********************************************************************************
// test api
    Cypress.Commands.add('login_register_phone_api', (phone) => {

        /** Check phone number for register or login.
         * Params: Body [phone].
         * Return: Status Code: 200 */

        phone = phone || Cypress.env('username');

        cy.session([phone], () => {
            cy.request({
                method: "POST",
                url: `${Cypress.env('API_BASE')}/user/login-register/`,
                body: {"phone": phone},
            }).then((response) => {
                expect(response).property('status').to.equal(200);
                cy.log('token is: ', response.body.data.token);
                cy.log('user_id is: ', response.body.data.user_id)
                Cypress.env('token', response.body.data.token);
                Cypress.env('user_id', response.body.data.user_id);
            });
        });
    });
//**********************************************************************
    Cypress.Commands.add('login_confirm_phone_api', (code) => {

        /** Get OTP for confirm phone.
         * Params: Body [user_id, token, code].
         * Return: Status Code: 200 */

        code = code || Cypress.env('password');

        cy.session([code], () => {
            cy.request({
                method: "POST",
                url: `${Cypress.env('API_BASE')}/user/confirm-phone/`,
                body: {
                    "user_id": Cypress.env('user_id'),
                    "token": Cypress.env('token'),
                    "code": code
                },
            }).then((response) => {
                expect(response).property('status').to.equal(200);
                expect(response.body.data.in_track.user_info.firstName).is.not.null;
                cy.log('log response', response.body)
                Cypress.env('token_final', response.body.data.token);
            });
        });
    });
//*************************
    Cypress.Commands.add('set_address_api', (address_id) => {

        /** Set Default Address.
         * Params: Headers [token].
         * Return: Status Code: 200 */

        address_id = address_id || Cypress.env('address_id');
        cy.request({
            method: "POST",
            url: `${Cypress.env('API_BASE')}/address/${address_id}/set-default/`,
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,fa;q=0.7",
                "Authorization": Cypress.env('token_final'),
                "Client": "desktop",
                "ClientId": "087eb5ad-33d4-4ea6-a4fd-c1d7672b0bc4",
                "ClientOs": "Windows",
                "Connection": "keep-alive",
                "Content-Type": "application/json",
                "Origin": "https://demo.digikalajet.com",
                "Referer": "https://demo.digikalajet.com/",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "Sec-Fetch-Site",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
                "X-Request-UUID": "067b7d1f-2067-4a16-83dd-5cf0923d97d4",
                "sec-ch-ua": '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "Windows",
            },
        }).then((response) => {
            expect(response).property('status').to.equal(200);
            if (response.body.status === 404) {
                expect(true);
                cy.log('address id is invalid.')
            } else {
                expect(response.body.data.address.id).is.not.null;
                expect(response.body.data.address.address).is.not.null;
            }
            cy.log('log response', response.body)
        });
    });
//******************************************************************************
    Cypress.Commands.add('cart_close_limit_and_shipping_fee', (limit) => {
        // cy.fixture('FF_ViewAllActiveSites_20180503_102650').then((file) => {
        cy.request({
            method: "POST",
            url: 'https://demo-dknow-api.digikala.com/admin/shop/item/49/?_back=http://demo-dknow-api.digikala.com/admin/shop/?city%3D%26city_id%3D0%26crud_tab_id%3D%26district_id%3D0%26hash_id%3D%26id%3D%26merchant_id%255B0%255D%3D2%26name%3D%26nickname%3D%26radius%3D%26status%3D',
            // form: true,
            // headers: {
            //     'content-type': 'multipart/form-data',
            // },
            // files: {
            //     file: file
            // },
            body: {
                merchant_id: "2",
                name: "جت مارت | سبلان",
                nickname: "فرزان فری",
                subtitle: "",
                owner_name: "حسام کریمی",
                status: "active",
                inactivation_reason_pending: "5",
                inactivation_reason_inactive: "3",
                inactivation_reason_vendor_issues: "1",
                inactivation_reason_termination_of_contract: "10",
                merchant_code: "86",
                phone: "09332749480",
                auto_call_phone: "",
                delivery_provider: "digiexpress",
                delivery_service_lvl: "",
                address: "سبلان جنوبی،خیابان مدنی،محله ی نظام آباد،خیابان طیرانی،پلاک ۲۵",
                district_id: "2676",
                city_id: "1698",
                state_id: "9",
                shipping_fee: "",
                shipping_fee_plan_id: "88",
                order_volume_limit: "100",
                preparation_time: "35",
                cart_close_limit: limit,
                service_radius: "7",
                service_radius_critical: "2",
                max_discount_percentage: "0",
                product_min_stock: "",
                background: "",
                icon: "",
                sort: "1",
                delivery_badge: "under-45",
                crud_tab_id: "main",
            },
        }).then((response) => {
            expect(response).property('status').to.equal(200);
        });
        // });
    });
//*********************************************************************************
    Cypress.Commands.add('select_shop_api', (shop_id) => {

        shop_id = shop_id || Cypress.env('shop_id')
        cy.request({
            method: "GET",
            url: `${Cypress.env('API_BASE')}/shop/${shop_id}/`,
            headers: {
                "Authorization": Cypress.env('token_final'),
            }
        }).then((response) => {
            expect(response).property('status').to.equal(200);
            if (response.body.status === 404) {
                expect(true);
                cy.log('shop id is invalid.')
            } else {
                expect(response.body.data.header.shop.status).to.eql('active');
                expect(response.body.data.header.shop.main_categories).length > 0;
                expect(response.body.data.header.shop.working_status.is_open).to.eql(true);
                Cypress.env('product1', response.body.data.body.widgets[0].data.products[0].id);
                Cypress.env('product2', response.body.data.body.widgets[0].data.products[1].id);
            }
            cy.log('log response', response.body)
        })
    })
//********************************************************************************
    Cypress.Commands.add('add_cart_api', () => {
        cy.request({
            method: "POST",
            url: `${Cypress.env('API_BASE')}/cart/add/`,
            body: {
                "shop_product_id": Cypress.env('product1'),
                "source": "web"
            },
            headers: {
                "Authorization": Cypress.env('token_final'),
            }
        }).then((response) => {
            expect(response).property('status').to.equal(200);
            if (response.body.message === "موجودی محصول تمام شده‌است.") {
                expect(response.body.status).to.equal(400);
            } else {
                expect(response.body.data.cart_shipment.hash_id).is.not.null;
                expect(response.body.data.cart_shipment.cart_items.items[0].item_id).is.not.null;
                expect(response.body.data.cart_shipment.cart_items.items[0].product.id).to.eql(Cypress.env('product1'));
                Cypress.env('cart_shipment_id', response.body.data.cart_shipment.hash_id);
                Cypress.env('cart_item_id', response.body.data.cart_shipment.cart_items.items[0].item_id);
                Cypress.env('product_id', response.body.data.cart_shipment.cart_items.items[0].product.id);
            }
            cy.log('log response', response.body)
        })
    })
//**************************************************************
    Cypress.Commands.add('shipping_api', () => {
        cy.request({
            method: "GET",
            url: `${Cypress.env('API_BASE')}/shipping/${Cypress.env('cart_shipment_id')}/`,
            headers: {
                "Authorization": Cypress.env('token_final'),
            }
        }).then((response) => {
            expect(response).property('status').to.equal(200);
            if (response.body.status === 404) {
                expect(true);
                cy.log('stock is 0 and basket is empty..')
            } else {
                expect(response.body.data.cart_shipments[0].address.id).is.not.null;
                expect(response.body.data.cart_shipments[0].address.address).is.not.null;
                Cypress.env('payable_price', response.body.data.cart_shipments[0].price.payable_price);
                Cypress.env('shop_id', response.body.data.cart_shipments[0].shop.id);
            }
            cy.log('log response', response.body)
        })
    })