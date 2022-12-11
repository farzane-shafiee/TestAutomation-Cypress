export async function utility(locator){
    cy.get(locator).invoke('text').as('Text');
}