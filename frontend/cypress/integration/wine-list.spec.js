/// <reference types="Cypress" />

import {baselineServerSetup} from "./util";

function removeBottleOfWineFromFirstCard() {
    cy.get(".dot-dot-dot-menu").first().click();
    cy.get(".remove-bottle-from-cellar").first().click();
}

context('Wine List', () => {
    beforeEach(() => {
        baselineServerSetup()

        cy.route({
            method: "POST",
            url: "/wine",
            status: 201,
            response: "Created: i guess i need a response..."
        }).as('postWines');


        cy.route({
            method: "POST",
            url: "/wine/remove-bottle-from-cellar",
            status: 200,
            response: "Created: i guess i need a response..."
        }).as('removeBottleFromCellar');

        cy.visit('/');
        cy.wait("@getWines")
    });


    it('should display a list of wine', () => {
        cy.get("[data-cy=wine-card]").should(record => {
            expect(record.length).to.eq(2);

            expect(record[0].querySelector("[data-cy=type]").innerText).to.eq("Barolo");
            expect(record[0].querySelector("[data-cy=producer]").innerText).to.eq("Lionello Marchesi");
            expect(record[0].querySelector("[data-cy=year]").innerText).to.eq('2009');
            expect(record[0].querySelector("[data-cy=quantity]").innerText).to.eq('2 left');
            expect(record[0].querySelector("[data-cy=country]").innerText).to.eq("Italy");
            expect(record[0].querySelector("[data-cy=cellar-location]").innerText).to.eq("Cellar Location: Upper Left");
            expect(record[0].querySelector("[data-cy=original-wooden-case-indicator]").innerText).to.eq("OWC");
            expect(record[0].querySelector("[data-cy=bottle-size]").innerText).to.eq("750 mL");

            expect(record[1].querySelector("[data-cy=type]").innerText).to.eq("Chianti");
            expect(record[1].querySelector("[data-cy=producer]").innerText).to.eq("Monsanto");
            expect(record[1].querySelector("[data-cy=year]").innerText).to.eq('2012');
            expect(record[1].querySelector("[data-cy=quantity]").innerText).to.eq('8 left');
            expect(record[1].querySelector("[data-cy=country]").innerText).to.eq("Italy");
            expect(record[1].querySelector("[data-cy=notes]").innerText).to.eq("Fancy Label");
            expect(record[1].querySelector("[data-cy=original-wooden-case-indicator]")).to.not.exist
            expect(record[1].querySelector("[data-cy=bottle-size]").innerText).to.eq("1.5 L");
        })
    });

    it('should display the number of bottles in the cellar', function () {
        cy.get(".wine-bottle-count").should(record => {
            expect(record.length).to.eq(1);
            expect(record[0].innerText).to.eq("10 bottles in cellar");
        });
    });

    it('should not display a cellar location if one is not passed', function () {
        cy.get("[data-cy=wine-card]").should(record => {
            expect(record[1].querySelector(".cellar-location")).to.eql(null)
        })
    });

    it('should filter when the user types in the search box', function () {
        cy.get("#search-bar").type("Monsanto");

        cy.get("[data-cy=wine-card]").should(record => {
            expect(record.length).to.eq(1);

            expect(record[0].querySelector("[data-cy=producer]").innerText).to.eq("Monsanto");
        })
    });

    it('should fetch all countries and the top 5 countries', function () {
        cy.wait("@getAllCountries");
        cy.wait("@getTop5Countries")
    });

    it('should sort wine records by year', function () {

        cy.get("[data-cy=wine-card]").should(record => {
            expect(record[0].querySelector("[data-cy=year]").innerText).to.eq('2009');
            expect(record[1].querySelector("[data-cy=year]").innerText).to.eq('2012');
        })

        cy.get("#sort-by-dropdown").select("YEAR")

        cy.get("[data-cy=wine-card]").should(record => {
            expect(record[0].querySelector("[data-cy=year]").innerText).to.eq('2012');
            expect(record[1].querySelector("[data-cy=year]").innerText).to.eq('2009');
        })
    });

    describe("deleting bottles from cellar", () => {
        beforeEach(function () {
            removeBottleOfWineFromFirstCard();
        });

        it('should call api with id', function () {
            cy.wait("@removeBottleFromCellar")
                .its('requestBody').should('eql', {"id": 12})
        });

        it('should decrease quantity on success', function () {
            cy.get("[data-cy=wine-card]").should(record => {
                expect(record[0].querySelector("[data-cy=quantity]").innerText).to.eq('1 left');
            })
        });

        it('should remove card when it reaches 0', function () {
            cy.wait("@removeBottleFromCellar");

            removeBottleOfWineFromFirstCard()

            cy.wait("@removeBottleFromCellar");
            cy.get("[data-cy=wine-card]").should(record => expect(record.length).to.eq(1))
        });
    });

    describe("Creating wine", () => {
        beforeEach(() => {
            cy.get("button#new-wine-button").click();
        });

        describe("When i fill out the form completely", () => {
            beforeEach(function () {
                cy.get("#create-wine-form .country-input select").select("Spain");

                cy.get("#create-wine-form .producer-input input").type("Orin Swift");
                cy.get("#create-wine-form .cellar-location-input input").type("Upper Left");
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
                    year: 2014,
                    cellarLocation: "Upper Left"
                })
            });


            it('should hide form on success', function () {
                cy.get("#create-wine-form .submit-button").click();
                cy.wait("@postWines");
                cy.wait(100);
                cy.get('#create-wine-form').should('not.exist');
            });

            it('should reload wines on success', function () {
                cy.get("#create-wine-form .submit-button").click();
                cy.wait("@postWines");
                cy.wait("@getWines");
            });
        });

        it('should allow the user to delete entirely a numeric value', function () {
            cy.get("#create-wine-form .year-input input").type("1");
            cy.get("#create-wine-form .year-input input").clear();
            cy.get("#create-wine-form .year-input input").should('have.value', '')

        });

        it('should not allow the user to submit the button until the form is complete', function () {
            cy.get("#create-wine-form .country-input select").select("Spain");
            cy.get("#create-wine-form .producer-input input").type("Orin Swift");
            cy.get("#create-wine-form .type-input input").type("Tempranillo");
            cy.get("#create-wine-form .cellar-location-input input").type("Upper Left");
            cy.get("#create-wine-form .quantity-input input").type("12");

            cy.get("#create-wine-form .submit-button").should("be.disabled");

            cy.get("#create-wine-form .year-input input").type("2014");

            cy.get("#create-wine-form .submit-button").should("not.be.disabled");
        });


        it('should remove the form if i click cancel', function () {
            cy.get("#create-wine-form .country-input select").select("Spain");
            cy.get("#create-wine-form button#cancel-new-wine").click();

            cy.get('#create-wine-form').should('not.exist');
        });
    })


});
