/// <reference types="Cypress" />

import {baselineServerSetup} from "./util";

context('Wine Record Page', () => {
    beforeEach(function () {
        baselineServerSetup()
    });

    describe("Navigating directly to the page", () => {
        beforeEach(function () {
            cy.visit('/wine-record/12');
        });

        it('should fetch wines', function () {
            cy.wait("@getWines")
        });

        it('should render a loading screen', function () {
            cy.get("[data-cy=record-loading]").should(it => expect(it[0].innerText).to.eq("Loading Record..."));
        });
    })

    describe("Navigating to an invalid url", () => {
        beforeEach(function () {
            cy.visit('/wine-record/122');
        });

        it('should render a loading screen', function () {
            cy.get("[data-cy=not-found]").should(it => expect(it[0].innerText).to.eq("Record not found, return to the home page"));
        });
    })

    describe("Navigating from home page", () => {

        const id = "12"
        beforeEach(() => {
            cy.route({
                method: "PUT",
                url: "/wine/12",
                status: 201,
                response: "Saved: i guess i need a response..."
            }).as('saveWine');


            cy.visit('/');
            cy.wait("@getWines")

            cy.get(".dot-dot-dot-menu").first().click();
            cy.get(".edit-record").first().click();
        });

        it('should navigate to the specific wine page when a wine is selected to edit', function () {
            cy.location().should((loc) => {
                expect(loc.pathname).to.eql(`/wine-record/${id}`)
            })
        });

        it('should render the id of the wine... to start', function () {
            cy.get("[data-cy=type]").should(it => expect(it[0].innerText).to.eq("Barolo"));
            cy.get("[data-cy=producer]").should(it => expect(it[0].innerText).to.eq("Lionello Marchesi"));
            cy.get("[data-cy=year]").should(it => expect(it[0].innerText).to.eq('2009'));
            cy.get("[data-cy=quantity]").should(it => expect(it[0].innerText).to.eq('2'));
            cy.get("[data-cy=country]").should(it => expect(it[0].innerText).to.eq("Italy"));
            cy.get("[data-cy=cellar-location]").should(it => expect(it[0].innerText).to.eq("Upper Left"));
            cy.get("[data-cy=original-wooden-case-indicator]").should(it => expect(it[0].innerText).to.eq("true"));
            cy.get("[data-cy=bottle-size]").should(it => expect(it[0].innerText).to.eq("750"));
        });

        it('should take the user back when the back button is clicked', function () {
            cy.get("[data-cy=back-button").click()

            cy.location().should((loc) => {
                expect(loc.pathname).to.eql(`/`)
            })
        });

        describe("save button behavior", () => {

            it('should have the button disabled if the input has not changed from the original', function () {
                cy.get(".submit-button").should("be.disabled");
            })

            it('should enable the button after a field is changed', function () {
                cy.get(".cellar-location-input input").type("MORE TEXT");
                cy.get(".submit-button").should("not.be.disabled");
            });

            it('should disable the button after a field is changed back to the original', function () {
                cy.get(".cellar-location-input input").type("TEXT");
                cy.get(".submit-button").should("not.be.disabled");
                cy.get(".cellar-location-input input").type("{backspace}");
                cy.get(".cellar-location-input input").type("{backspace}");
                cy.get(".cellar-location-input input").type("{backspace}");
                cy.get(".cellar-location-input input").type("{backspace}");
                cy.get(".submit-button").should("be.disabled");
            });

            it('should save the wine record when the submit button is clicked', function () {
                cy.get(".cellar-location-input input").type(" SOMETHING ELSE");
                cy.get(".submit-button").click()

                cy.wait("@saveWine")
            });

            it('should fetch the new state of the world', function () {
                cy.get(".cellar-location-input input").type(" SOMETHING ELSE");
                cy.get(".submit-button").click()

                cy.wait("@saveWine")
                cy.wait("@getWines")
            });

            it('should fetch the new state of the world and no longer allow for the save button to be clicked ', function () {

                cy.route('GET', '/wine', {
                    wine: [
                        {
                            country: "Italy",
                            producer: "Lionello Marchesi",
                            quantity: 2,
                            type: "Barolo",
                            year: 2009,
                            cellarLocation: "Upper Left SOMETHING ELSE",
                            id: 12,
                            bottleSize: 750,
                            originalWoodenCase: true
                        },
                        {
                            type: "Chianti",
                            producer: "Monsanto",
                            year: 2012,
                            quantity: 8,
                            country: "Italy",
                            id: 15,
                            notes: "Fancy Label",
                            bottleSize: 1500,
                            originalWoodenCase: false
                        }
                    ]
                }).as('getWines');

                cy.get(".cellar-location-input input").type(" SOMETHING ELSE");
                cy.get(".submit-button").click()

                cy.wait("@saveWine")
                cy.wait("@getWines")

                cy.get(".submit-button").should("be.disabled");
            });
        })
    })

});
