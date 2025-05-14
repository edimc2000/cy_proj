const BookingPage = require('./bookingFormPage');
const testData = require('../fixtures/bookingFormTestData.js')
const utils = require('../utils/utils.js');


class Booking extends BookingPage {

    bookTrip(tripType, cabinClass, leavingFrom, goingTo, dateDepart, dateReturn) {
        this.clickRadio(tripType)
        this.inputTripDetails(tripType, cabinClass, leavingFrom, goingTo, dateDepart, dateReturn)
    }

    inputTripDetails(tripType, cabinClass, leavingFrom, goingTo, dateDepart, dateReturn) {
        cy.section(`Input trip details`)
        cy.step(`Input cabin class`)
        this.selectors.getSelectCabinClass().select(cabinClass)
        cy.step(`Input leaving from and going to`)
        this.selectors.getSelectFrom().select(leavingFrom)
        this.selectors.getSelectTo().select(goingTo)

        cy.step(`Input date(s)`)
        cy.log(dateDepart)
        this.tripDatePicker(dateDepart, this.selectors.getInputDepartField)
        if (tripType === 'Round trip') this.tripDatePicker(dateReturn, this.selectors.getInputReturnField)
    }

    inputPassengerDetails = (numPassengers, passenger1Input) => {
        cy.section(`Input passenger details`)
        this.selectors.getSelectNumPassengers().select(numPassengers)
        cy.step(`Input passenger 1`)
        this.selectors.getSelectPassenger1().select(passenger1Input)
        if (numPassengers > 1) {
            for (let i = 2; i <= numPassengers; i++) {
                cy.step(`Input passenger ${i}`)
                this.selectors['getSelectPassenger' + [i]]().select(testData.divs['Passenger ' + [i]].defaultValue)
            }
        } else {
            this.selectors.getSelectNumPassengers().select(numPassengers)
        }
        cy.section(`Book - Click the button`)
        this.clickBook()
    }

    /**
     * clicks the corresponding radio button for the trip type section  
     * @param {string} tripType 'One way' for one way trip  and 'Round trip' for roundtrip 
     */
    clickRadio(tripType) {
        cy.section(`Input trip type`)
        cy.step(`Click radio button: ${tripType}`)
        tripType === 'One way'
            ? this.selectors.getRadioOneWay().click()
            : this.selectors.getRadioRountrip().click()
        this.validateTripType(tripType)
    }

    /**
    * clicks the book button  
    */
    clickBook() {
        this.selectors.getButtonBook().click()
    }

    validateSummary(tripType, leavingFrom, goingTo, dateDepart, dateReturn, passengerDetails) {
        cy.section(`Validate Booking Summary`)
        cy.step(`Validate Depature`)
        let departInfo = ['DEPART', `${leavingFrom} to ${goingTo}`, utils.convertDateFormat(dateDepart)]
        this.selectors.getDivDepartSummary().children().each(function (info, index) {
            cy.wrap(info).should('have.text', departInfo[index])
        })

        if (tripType === 'Round trip') {
            cy.step(`Validate Return`)
            let returnInfo = ['RETURN', `${goingTo} to ${leavingFrom}`, utils.convertDateFormat(dateReturn)]
            this.selectors.getDivReturnSummary().children().children().each(function (info, index) {
                cy.wrap(info).should('have.text', returnInfo[index])
            })
        }

        cy.step(`Validate Passenger(s)`)
        this.selectors.getDivPassengerSummary().children().each(function (info, index) {
            cy.wrap(info).should('have.text', passengerDetails[index])
        })
    }

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

    validateTripType(tripType) {
        let assertRadio1
        let assertRadio2
        tripType === 'One way'
            ? (assertRadio1 = () => this.selectors.getRadioOneWay(), assertRadio2 = () => this.selectors.getRadioRountrip())
            : (assertRadio2 = () => this.selectors.getRadioOneWay(), assertRadio1 = () => this.selectors.getRadioRountrip())
        assertRadio1().should('be.checked')
        assertRadio2().should('not.be.checked')
    }

    /** Validates the form based on supplied args 
    * @param {string} tripType 'One way' for one way trip  and 'Round trip' for roundtrip. 
    * If no argument is supplied, it defaults to 'One way'
    */
    validateLabelsAndElements(tripType) {
        tripType = tripType ?? 'One way'
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
                            let inputReturnAssertionEnabled = testData.divs[label.text()].assertInputElement.assertEnabled
                            label.text() === 'Return' && tripType === 'Round trip' ? inputReturnAssertionEnabled = 'be.enabled' : null
                            cy.wrap(input).find(testData.divs[label.text()].inputType)
                                .should(inputReturnAssertionEnabled)
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

    /**
     * Date picker using clicks instead of using the input boxes 
     * @param {string} strDate format 'mm/dd/yyy'
     * @param {*} datePickerElement  css selector example: ':nth-child(5) > div input'
     */
    tripDatePicker = (strDate, datePickerElement) => {
        let monthValueOnField
        let numOfClicks

        cy.get(datePickerElement).then(dateValue => {
            monthValueOnField = dateValue.val()
            numOfClicks = Number(strDate.slice(0, 2)) - Number(monthValueOnField.slice(0, 2))
            cy.get(datePickerElement).click()
            this.selectors.getDatePickerButtonNext().realClick({ clickCount: numOfClicks })
            cy.get(`[aria-label="Choose ${utils.convertDateFormatv2(strDate)}"]`).realClick()
        })
    }


    createAssertionValuesForPassengers(passenger1Input, numPassengers, passengerDetails, cabinClass) {
        if (numPassengers > 1) {
            for (let i = 2; i <= numPassengers; i++) {
                console.log(i)
                console.log(testData.divs['Passenger ' + [i]].defaultValue)
                passengerDetails.push(`Passenger ${i}: ${testData.divs['Passenger ' + [i]].defaultValue}`)
            }
        }
        passengerDetails.push(`Cabin class: ${cabinClass}`)
    }

    /**
     * @returns 3 dates, date tomorrow, date next month +7days  and date next week
     * example format 
     * .dateNextWeek: '05/20/2025' one week from now 
     * .dateNextFiveWeeks: '06/20/2025' 
     * .dateTomorrow: '05/14/2025'
     */
    testDates = () => {
        const nextWeek = new Date()
        nextWeek.setDate(nextWeek.getDate() + 7)

        const nextMonth = new Date()
        nextMonth.setDate(nextMonth.getDate() + 30)

        const nextDay = new Date()
        nextDay.setDate(nextDay.getDate() + 1)
        const fourWeeks = (nextMonth.getMonth() + 1).toString().padStart(2, '0')

        const month = (nextWeek.getMonth() + 1).toString().padStart(2, '0')
        const day = nextWeek.getDate().toString().padStart(2, '0')
        const dateTomorrow = nextDay.getDate().toString().padStart(2, '0')
        const year = nextWeek.getFullYear().toString()//.slice(-2)

        const tripDate = {
            dateNextWeek: `${month}/${day}/${year}`,
            dateNextFiveWeeks: `${fourWeeks}/${day}/${year}`,
            dateTomorrow: `${month}/${dateTomorrow}/${year}`
        }
        return tripDate
    }
}



module.exports = new Booking()


