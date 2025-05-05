// POM based
/// <reference types = "cypress" />

const Booking = require('../../pages/bookingForm.js')
const { testData } = require('./data/booking-form-test-data.js')
const elements = Booking.elements;

describe('TG Booking Form', () => {

    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/booking');
    })

    it.only('[TC01] Validate the default Book your trip form', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/booking
        // used beforeEach()

        // 2. Validate that the “One way” radio button is displayed enabled and selected by default
        elements.radioButtonOneWay()
            .should('be.visible')
            .and('be.enabled')
            .and('be.checked')

        // 3. Validate that the “Round trip” radio button is displayed enabled and not selected by default
        elements.radioButtonRoundTrip()
            .should('be.visible')
            .and('be.enabled')
            .and('not.be.checked')

        // 4. Validate that the “Cabin Class” label and dropdown are displayed
        elements.labelCabinClass()
            .should('be.visible')
            .and('have.text', 'Cabin Class')

        elements.selectCabinClass()
            .should('be.visible')
            .and('have.value', 'Select cabin class...')


        // 5. Validate that the “From” label and dropdown are displayed
        elements.labelFrom()
            .should('be.visible')
            .and('have.text', 'From')

        elements.selectFrom()
            .should('be.visible')
            .and('have.value', 'Select state...')

        // 6. Validate that the “To” label and dropdown are displayed

        // 7. Validate that the “Depart” label and date picker is displayed

        // 8. Validate that the “Return” label and date picker is displayed and disabled

        // 9. Validate that the “Number of passengers” label and dropdown are displayed and 1 is the default

        // 10. Validate that the “Passenger 1” category label and dropdown are displayed and “Adult (16-64)” is the default

        // 11.Validate that the “BOOK” button is displayed and enabled


    })

    it('check passegers', () => {
        elements.labelPassengerCount().select(6)
        elements.labelPassengerX()
    })



})