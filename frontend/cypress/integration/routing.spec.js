/// <reference types="Cypress" />

import { baselineServerSetup } from './util'

context('Routing', () => {
  beforeEach(function () {
    baselineServerSetup()
  })

  describe('when i navigate to some bogus route', () => {
    beforeEach(function () {
      cy.visit('/whirly-dirly')
    })
    it('should redirect to login', function () {
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/login')
      })
    })
  })

  describe('When I go to the root URL', function () {
    beforeEach(function () {
      cy.visit('/')
    })

    it('should just take me to login page', function () {
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/login')
      })

      it('should ask which user i want to be', function () {
        cy.contains('Who are you?')
        cy.contains('JIMMY_JOHN')
        cy.contains('Billy Bob')
      })

    })

    describe('When i login', () => {
      beforeEach(function () {
        cy.contains('Billy Bob').click()
      })

      it('should save username and id in local storage', function () {
        expect(window.localStorage.getItem('userId')).to.eql('445566')
        expect(window.localStorage.getItem('userName')).to.eql('Billy Bob')
      })
    })
  })

  describe('When i\'ve already logged in', () => {
    beforeEach(function () {
      window.localStorage.setItem('userId', 123)
      window.localStorage.setItem('userName', 'bobb')
    })

    describe('When I go to the root URL', function () {
      beforeEach(function () {
        cy.visit('/')
      })

      it('should just take me to root page', function () {
        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/')
        })
      })
    })

  })
})
