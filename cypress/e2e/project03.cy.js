/// <reference types = "cypress" />
require('cypress-plugin-steps')
require('cypress-real-events')

const bookingPage = require('../pages/bookingFormMethods.js')
const selectors =  bookingPage.selectors
const testData = require('../fixtures/bookingFormTestData.js')
const utils = require('../utils/utils.js')

describe('TG Booking Form', () => {
    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/booking');
    })

    it.only('[TC01] Validate the default Book your trip form', () => {
        
        cy.section(`Validate the trip type section`)
        bookingPage.validateTripTypeDefaults('One way')
        bookingPage.validateTripTypeDefaults('Round trip')
        
        cy.section(`Validate the labels and input elements`)
        bookingPage.validateLabelsAndElements()
        
        cy.section(`Validate the book button`)
        bookingPage.validateBookButton()

        

    })

    it('[TC02] Validate the Book your trip form when Round trip is selected', () => {

    })

    it('[TC03] Validate the booking for 1 passenger and one way', () => {

    })
    it('[TC04] Validate the booking for 1 passenger and round trip', () => {

    })

    it('[TC05] Validate the booking for 2 passengers and one way', () => {

    })
})