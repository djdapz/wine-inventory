// https://docs.cypress.io/api/introduction/api.html

describe('Inventory E2E Test', () => {

    describe("Displaying a list of wine", () => {
        beforeEach(() => {
            cy.visit('/');

        });
        it('displays a table', () => {
            cy.get('#inventory > th').contains("Wine");
            cy.get('#inventory > th').contains("Year");
            cy.get('#inventory > th').contains("Country");
            cy.get('#inventory > th').contains("Quantity");
        })
    });

});
