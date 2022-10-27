function getText(locator){
    return cy.get(locator).then(attribute => {
        attribute.text();
    })
}
