const BookingPage = require('./bookingFormPage');
const testData = require('../fixtures/bookingFormTestData.js')
const utils = require('../utils/utils.js');


class Booking extends BookingPage {

    validateTripTypeDefaults(tripType) {
        let assertRadio
        tripType === 'One way' ? assertRadio = () => this.selectors.getRadioOneWay() : assertRadio = () => this.selectors.getRadioRountrip()
        assertRadio()
            .should(testData.radioButtons[tripType].defaultAssertionEnabled)
            .and(testData.radioButtons[tripType].defaultAssertionVisibility)
            .and(testData.radioButtons[tripType].defaultAssertionChecked)
            .parent()
            .should('have.text', testData.radioButtons[tripType].labelName)
            .and('be.visible')
    }

    validateLabelsAndElements() {
        this.selectors.getDivLabelsExceptTripType().each(function (data) {
            cy.wrap(data) //labels
                .children().eq(0)
                .then(function (label) {
                    cy.step(`Validate label - ${label.text()}`)
                    cy.wrap(label)
                        .should('have.text', testData.divs[label.text()].labelName)
                        .and('be.visible')
                        .parent()
                        .children().eq(1) //inputs 
                        .then(function (input) {
                            cy.step(`Validate defaults for input element - ${label.text()}`)
                            cy.wrap(input).find(testData.divs[label.text()].inputType)
                                .should(testData.divs[label.text()].assertInputElement.assertEnabled)
                                .and(testData.divs[label.text()].assertInputElement.assertVisibility)
                        })
                })
        })

    }

    validateBookButton() {
        this.selectors.getButtonBook()
            .should('have.text', testData.buttons.book.labelName)
            .and(testData.buttons.book.defaultAssertionVisibility)
            .and(testData.buttons.book.defaultAssertionEnabled)
    }






    // inputTripType = (tripType, cabinClass, fromValue, toValue, departDate, returnDate) => {
    //     if (tripType === 'Round trip') {
    //         elements.getRadioRT().check()
    //         this.inputTripDetails(cabinClass, fromValue, toValue, departDate)
    //         this.tripDatePicker(returnDate, elements.getInputReturnField)

    //     } else {
    //         elements.getRadioOW().check()
    //         this.inputTripDetails(cabinClass, fromValue, toValue, departDate)
    //     }
    // }

    // inputPassengerDetails = (numPassengers, passenger1Input) => {
    //     elements.getSelectPassenger1().select(passenger1Input)

    //     if (numPassengers > 1) {
    //         elements.getSelectNumPassengers().select(numPassengers)
    //         for (let i = 2; i <= numPassengers; i++) {
    //             elements['selectPassenger' + [i]]().select(testData.divs['Passenger ' + [i]].defaultValue)
    //         }
    //     } else {
    //         elements.getSelectNumPassengers().select(numPassengers)
    //     }
    // }

    // inputTripDetails = (cabinClass, fromValue, toValue, departDate) => {
    //     elements.getSelectCabinClass().select(cabinClass)
    //     elements.getSelectFrom().select(fromValue)
    //     elements.getSelectTo().select(toValue)
    //     this.tripDatePicker(departDate, elements.getInputDepartField)
    // }

    // tripDatePicker = (strDate, datePickerElement) => {
    //     let monthValueOnField
    //     let numOfClicks

    //     cy.get(datePickerElement).then(dateValue => {
    //         monthValueOnField = dateValue.val()
    //         numOfClicks = Number(strDate.slice(0, 2)) - Number(monthValueOnField.slice(0, 2))
    //         cy.get(datePickerElement).click()
    //         elements.getDatePickerButtonNext().realClick({ clickCount: numOfClicks })
    //         cy.get(`[aria-label="Choose ${utils.convertDateFormatv2(strDate)}"]`).realClick()
    //     })
    // }
}

module.exports = new Booking()


