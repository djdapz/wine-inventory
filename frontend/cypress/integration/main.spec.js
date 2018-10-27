/// <reference types="Cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.server();

        cy.route('GET', '/wines', {
            wine: [
                {
                    country: "Italy",
                    producer: "Lionello Marchesi",
                    quantity: 10,
                    type: "Barolo",
                    year: 2009,
                },
                {
                    type: "Chianti",
                    producer: "Monsanto",
                    year: 2012,
                    quantity: 8,
                    country: "Italy"
                }
            ]
        }).as('getWines');


        cy.route({
            method: "POST",
            url: "/wines",
            status: 201
        }).as('postWines');

        cy.visit('/');
        cy.wait("@getWines")
    });


    it('should display a list of wine', () => {
        // https://on.cypress.io/trigger

        // To interact with a range input (slider)
        // we need to set its value & trigger the
        // event to signal it changed

        // Here, we invoke jQuery's val() method to set
        // the value and trigger the 'change' event
        cy.get(".wine-card").should(record => {
            expect(record.length).to.eq(2);

            expect(record[0].querySelector(".type").innerText).to.eq("Barolo");
            expect(record[0].querySelector(".producer").innerText).to.eq("Lionello Marchesi");
            expect(record[0].querySelector(".year").innerText).to.eq('2009');
            expect(record[0].querySelector(".quantity").innerText).to.eq('10 left');
            expect(record[0].querySelector(".country").innerText).to.eq("Italy");

            expect(record[1].querySelector(".type").innerText).to.eq("Chianti");
            expect(record[1].querySelector(".producer").innerText).to.eq("Monsanto");
            expect(record[1].querySelector(".year").innerText).to.eq('2012');
            expect(record[1].querySelector(".quantity").innerText).to.eq('8 left');
            expect(record[1].querySelector(".country").innerText).to.eq("Italy");
        })
    });

    describe("Creating wine", () => {
        beforeEach(() => {
            cy.get("button#new-wine-button").click();
        });

        describe("When i fill out the form completely", () => {
            beforeEach(function () {
                cy.get("#create-wine-form .country-input input").type("Spain");
                cy.get("#create-wine-form .producer-input input").type("Orin Swift");
                cy.get("#create-wine-form .type-input input").type("Tempranillo");
                cy.get("#create-wine-form .quantity-input input").type("12");
                cy.get("#create-wine-form .year-input input").type("2014");
            });

            it("should allow user to fill out form", () => {
                cy.get("#create-wine-form .submit-button").click();

                cy.wait("@postWines").its('requestBody').should('deep.equal', {
                    country: "Spain",
                    producer: "Orin Swift",
                    type: "Tempranillo",
                    quantity: 12,
                    year: 2014
                })
            });


            it('should hide form on success', function () {
                cy.get("#create-wine-form .submit-button").click();
                cy.wait("@postWines");
                cy.get('#create-wine-form').should('not.exist');
            });

            it('should reload wines on success', function () {
                cy.get("#create-wine-form .submit-button").click();
                cy.wait("@postWines");
                cy.wait("@getWines");
            });
        });


        it('should not allow the user to submit the button until the form is complete', function () {
            cy.get("#create-wine-form .country-input input").type("Spain");
            cy.get("#create-wine-form .producer-input input").type("Orin Swift");
            cy.get("#create-wine-form .type-input input").type("Tempranillo");
            cy.get("#create-wine-form .quantity-input input").type("12");

            cy.get("#create-wine-form .submit-button").should("be.disabled");

            cy.get("#create-wine-form .year-input input").type("2014");

            cy.get("#create-wine-form .submit-button").should("not.be.disabled");
        });


        it('should remove the form if i click cancel', function () {
            cy.get("#create-wine-form .country-input input").type("Spain");
            cy.get("#create-wine-form button#cancel-new-wine").click();

            cy.get('#create-wine-form').should('not.exist');
        });
    })
});
