/// <reference types="Cypress" />

import { baselineServerSetup } from "./util"

context("Routing", () => {
  beforeEach(function () {
    baselineServerSetup()
  })

  describe("when i navigate to some bogus route", () => {
    beforeEach(function () {
      cy.visit("/whirly-dirly")
    })
    it("should redirect to home", function () {
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/")
      })
    })
  })
})
