// POM based
/// <reference types = "cypress" />
require('cypress-plugin-steps')
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
        bookingMethods.bookTrip('Round trip', 'First', 'CA', 'IL', '1', '06/01/2025', '06/25/2025')
    })

    it('[TC05] Validate the booking for 2 passengers and one way', () => {
        bookingMethods.bookTrip('One Way', 'Premium Economy', 'NY', 'TX', '2', '05/09/2025', '06/25/2025')
    })
})