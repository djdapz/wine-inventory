/// <reference types="Cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.server();


        cy.route('POST', 'localhost:8080/wines', {
            wines: [
                {
                    type: "Barolo",
                    producer: "Lionello Marchesi",
                    year: 2009,
                    quantity: 10
                },
                {
                    type: "Chianti",
                    producer: "Monsanto",
                    year: 2012,
                    quantity: 8
                }
            ]
        }).as('getWines');

        cy.visit('http://localhost:3210/');
        cy.wait("@getWines")
    });


    it('should display a list of wine', () => {
        // https://on.cypress.io/trigger

        // To interact with a range input (slider)
        // we need to set its value & trigger the
        // event to signal it changed

        // Here, we invoke jQuery's val() method to set
        // the value and trigger the 'change' event
        cy.get(".wine-record").should(record => {
            expect(record.length).to.eq(2);

            expect(record[0].find(".type").innerHTML).to.eq("Barolo");
            expect(record[0].find(".producer").innerHTML).to.eq("Lionello Marchesi");
            expect(record[0].find(".year").innerHTML).to.eq(2009);
            expect(record[0].find(".quantity").innerHTML).to.eq(10);

            expect(record[1].find(".type").innerHTML).to.eq("Chianti");
            expect(record[1].find(".producer").innerHTML).to.eq("Monsanto");
            expect(record[1].find(".year").innerHTML).to.eq(2012);
            expect(record[1].find(".quantity").innerHTML).to.eq(8);
        })
    })
});
