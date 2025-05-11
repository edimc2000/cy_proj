// POM based
/// <reference types = "cypress" />
require('cypress-plugin-steps')
require('cypress-real-events')
const booking = require('../pages/bookingFormPage.js')
const testData = require('./data/bookingFormTestData.js')
const utils = require('../utils/utils.js')
const bookingMethods = require('../pages/bookingFormMethods.js')
const elements = booking.elements;

describe('TG Booking Form', () => {

    beforeEach(() => {

        cy.visit('https://www.techglobal-training.com/frontend/booking');
    })

    it('[TC01] Validate the default Book your trip form', () => {
        bookingMethods.validateBookingForm('One Way')
    })

    it('[TC02] Validate the Book your trip form when Round trip is selected', () => {
        elements.radioRT().check()
        bookingMethods.validateBookingForm('Round trip')
    })

    it('[TC03] Validate the booking for 1 passenger and one way', () => {
        bookingMethods.bookTrip('One Way', 'Business', 'IL', 'FL', '1', null, null, 'Senior (65+)')
    })
    it('[TC04] Validate the booking for 1 passenger and round trip', () => {
        bookingMethods.bookTrip('Round trip', 'First', 'CA', 'IL', '1', null, null)
    })

    it('[TC05] Validate the booking for 2 passengers and one way', () => {
        let departDate = testData.testDates()
        bookingMethods.bookTrip('One Way', 'Premium Economy', 'NY', 'TX', '2', departDate.tomorrow)
    })

    it.only('[TC05] Validate the booking for 2 passengers and one way', () => {

        /// this is you date picker function
        const dateTesting = '10/20/2025'
        const formattedDateTesting = utils.convertDateFormatv2(dateTesting)
        const dateRTesting = '12/20/2025'
        const formattedRDateTesting = utils.convertDateFormatv2(dateRTesting)

        elements.inputDepart().clear().type(dateTesting.slice(0, 2))
        elements.inputDepart().click()
        cy.get(`[aria-label="Choose ${formattedDateTesting}"]`).click()

        elements.radioRT().click()
        elements.inputReturn().click()
        
        elements.inputReturn().clear().type(dateRTesting.slice(0,2))
        cy.get(`[aria-label="Choose ${formattedRDateTesting}"]`).click()

    })


})