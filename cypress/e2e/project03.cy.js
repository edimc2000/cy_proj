/// <reference types = "cypress" />
require('cypress-plugin-steps')
require('cypress-real-events')

const bookingPage = require('../pages/bookingFormMethods.js')
const selectors = bookingPage.selectors
const testData = require('../fixtures/bookingFormTestData.js')
const utils = require('../utils/utils.js')

describe('TG Booking Function', () => {
    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/booking');
    })

    it('[TC01] Validate the default Book your trip form', () => {
        cy.section(`Validate the trip type section - labels and input elements`)
        bookingPage.validateTripTypeDefaults('One way')
        bookingPage.validateTripTypeDefaults('Round trip')

        cy.section(`Validate the labels and input elements`)
        bookingPage.validateLabelsAndElements()

        cy.section(`Validate the book button`)
        bookingPage.validateBookButton()
    })

    it('[TC02] Validate the Book your trip form when Round trip is selected', () => {
        let tripType = 'Round trip'
        bookingPage.clickRadio(tripType)

        cy.section(`Validate the labels and input elements`)
        bookingPage.validateLabelsAndElements(tripType)

        cy.section(`Validate the book button`)
        bookingPage.validateBookButton()
    })

    it('[TC03] Validate the booking for 1 passenger and one way', () => {
        let tripType = 'One way'
        let cabinClass = 'Business'
        let leavingFrom = 'IL'
        let goingTo = 'FL'
        let dateDepart = bookingPage.testDates().dateNextWeek
        let dateReturn = null
        let numPassengers = '1'
        let passenger1Input = 'Senior (65+)'

        let passengerDetails = [`Number of Passengers: ${numPassengers}`, `Passenger 1: ${passenger1Input}`]
        bookingPage.createAssertionValuesForPassengers(passenger1Input, numPassengers, passengerDetails, cabinClass)

        bookingPage.bookTrip(tripType, cabinClass, leavingFrom, goingTo, dateDepart, dateReturn)
        bookingPage.inputPassengerDetails(numPassengers, passenger1Input)
        bookingPage.validateSummary(tripType, leavingFrom, goingTo, dateDepart, dateReturn, passengerDetails)
    })

    it('[TC04] Validate the booking for 1 passenger and round trip', () => {
        let tripType = 'Round trip'
        let cabinClass = 'First'
        let leavingFrom = 'CA'
        let goingTo = 'IL'
        let dateDepart = bookingPage.testDates().dateNextWeek
        let dateReturn = bookingPage.testDates().dateNextFiveWeeks
        let numPassengers = '1'
        let passenger1Input = 'Adult (16-64)'

        let passengerDetails = [`Number of Passengers: ${numPassengers}`, `Passenger 1: ${passenger1Input}`]
        bookingPage.createAssertionValuesForPassengers(passenger1Input, numPassengers, passengerDetails, cabinClass)

        bookingPage.bookTrip(tripType, cabinClass, leavingFrom, goingTo, dateDepart, dateReturn)
        bookingPage.inputPassengerDetails(numPassengers, passenger1Input)
        bookingPage.validateSummary(tripType, leavingFrom, goingTo, dateDepart, dateReturn, passengerDetails)
    })

    it('[TC05] Validate the booking for 2 passengers and one way', () => {
        let tripType = 'One way'
        let cabinClass = 'Premium Economy'
        let leavingFrom = 'NY'
        let goingTo = 'TX'
        let dateDepart = bookingPage.testDates().dateTomorrow
        let dateReturn = null
        let numPassengers = '2'
        let passenger1Input = 'Adult (16-64)'
        let passengerDetails = [`Number of Passengers: ${numPassengers}`, `Passenger 1: ${passenger1Input}`]
        
        bookingPage.createAssertionValuesForPassengers(passenger1Input, numPassengers, passengerDetails, cabinClass)
        console.log(passengerDetails)

        bookingPage.bookTrip(tripType, cabinClass, leavingFrom, goingTo, dateDepart, dateReturn)
        bookingPage.inputPassengerDetails(numPassengers, passenger1Input)
        bookingPage.validateSummary(tripType, leavingFrom, goingTo, dateDepart, dateReturn, passengerDetails)
    })
})