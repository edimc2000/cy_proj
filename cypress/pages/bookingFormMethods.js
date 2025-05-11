// const testData = require('./data/bookingFormTestData.js')
const testData = require('../e2e/data/bookingFormTestData')
const booking = require('./bookingFormPage')
const utils = require('../utils/utils.js')

const elements = booking.elements;

class BookingMethods {

    validateBookingForm = (radio) => {
        { // validates labels' visibility and string value, validates inputs' 
            // clickability, visibility and default values and states 
            let radioVar
            radio === "One Way" ? radioVar = testData.radioButtons : radioVar = testData.radioButtonsRT
            elements.divLabels().each((el, index) => {
                const labelText = el.text()
                const labelObj = testData.divs[labelText]
                const labelObjAssert = testData.divs[labelText].assertInputElement

                cy.section(`VALIDATING ${labelText} label and input elements`)
                if (labelText === testData.divs[labelText].labelName) {
                    if (labelText === testData.mainLabelException) {
                        elements.radioButtons().each(el => {
                            const radioText = el.text()
                            const radioObj = radioVar[radioText]

                            cy.step(`${labelText} > ${radioText} - RADIO and LABEL assertions  visibility and string matching`)
                            if (radioText === radioObj.labelName) {
                                cy.wrap(el)
                                    .should(radioObj.assertVisibility)
                                    .and('have.text', radioObj.labelName)
                                    .children()
                                    .should(radioObj.assertChecked)
                                    .and(radioObj.assertEnabled)
                                    .and(radioObj.assertVisibility)
                            }
                        })
                    } else {
                        cy.step(`${labelText} - MAIN LABEL assertions  visibility and string matching`)
                        cy.wrap(el)
                            .should(labelObjAssert.assertVisibility)
                            .and('have.text', labelObj.labelName)
                            .next().children().then((el) => {
                                const tagName = el.prop('tagName')
                                if (tagName === "SELECT") {
                                    cy.step(`${labelText} > ${tagName} - Drop Down input Assertions - visibility and clikability`)
                                    cy.wrap(el)
                                        .should(labelObjAssert.assertEnabled)
                                        .and(labelObjAssert.assertVisibility)
                                    if (labelText === 'Passenger 1') {
                                        cy.wrap(el).should('have.value', labelObj.defaultValue)
                                    }
                                    if (labelText === 'Number of passengers') {
                                        cy.wrap(el).should('have.value', labelObj.defaultValue)
                                    }
                                } else {
                                    cy.step(`${labelText} > ${tagName} -  Datepicker input Assertions - visibility and clikability`)
                                    if (labelText === 'Return' && radio !== "One Way") {
                                        cy.wrap(el).find('[type="text"]')
                                            .should(labelObjAssert.assertVisibility)
                                            .and(labelObjAssert.assertEnabledRT)
                                    } else {
                                        cy.wrap(el).find('[type="text"]')
                                            .should(labelObjAssert.assertVisibility)
                                            .and(labelObjAssert.assertEnabled)
                                    }

                                }
                            })
                    }
                }
            })
        }

        cy.section(`BOOK - validating the button`)
        cy.step('BOOK - validate the button - string value, visibility, clickability')
        elements.buttonBook()
            .should('be.visible')
            .and('have.text', 'BOOK')
            .and('be.enabled')
    }

    bookTrip = (tripTypeInput, cabinClassInput, fromInput, toInput, numPassengersInput, departDateInput, returnDateInput, passenger1Input) => {
        cy.section(`Input trip details`)

        const tripDate = testData.testDates()

        const cabinClass = cabinClassInput
        const fromValue = fromInput
        const toValue = toInput
        const numPassengers = numPassengersInput ?? 1
        const departDate = departDateInput ?? tripDate.dDate
        const returnDate = returnDateInput ?? tripDate.rDate
        const tripType = tripTypeInput ?? 'One way'
        passenger1Input = passenger1Input ?? testData.divs['Passenger 1'].defaultValue

        const departDateFormattted = utils.convertDateFormat(departDate)
        const returnDateFormattted = utils.convertDateFormat(returnDate)

        const departExpectedVal = ['DEPART', `${fromInput} to ${toInput}`, departDateFormattted]
        const returnExpectedVal = ['RETURN', `${toInput} to ${fromInput}`, returnDateFormattted]
        const passengersExpectedVal = [`Number of Passengers: ${numPassengers}`, `Cabin class: ${cabinClass}`]

        let summaryContainers = 0

        for (let i = 1; i <= numPassengers; i++) {
            i > 1 ? passengersExpectedVal.splice(i, 0, `Passenger ${i}: ${testData.divs['Passenger ' + [i]].defaultValue}`)
                : passengersExpectedVal.splice(i, 0, `Passenger ${i}: ${passenger1Input}`)
        }

        if (tripType === 'Round trip') {
            elements.radioRT().check()
            this.inputTripDetails(cabinClass, fromValue, toValue, departDate)
            this.tripDatePicker(returnDate, elements.inputReturnElement)

        } else {
            elements.radioOW().check()
            this.inputTripDetails(cabinClass, fromValue, toValue, departDate)
        }

        if (numPassengers > 1) {
            elements.selectNumPassengers().select(numPassengers)
            for (let i = 2; i <= numPassengers; i++) {
                elements['selectPassenger' + [i]]().select(testData.divs['Passenger ' + [i]].defaultValue)
            }
        } else {
            elements.selectNumPassengers().select(numPassengers)
        }

        elements.selectPassenger1().select(passenger1Input)
        elements.buttonBook().click()

        elements.divSummary()
            .each(el => {
                summaryContainers += 1
                if (summaryContainers === 1) {
                    cy.step(`${tripType} ${numPassengers} Passenger(s) - Depart results assertion`)
                    cy.wrap(el)
                        .children()
                        .eq(0)
                        .children()
                        .each((el, index) => {
                            cy.wrap(el).should('have.text', departExpectedVal[index])
                        })
                    if (tripType === 'Round trip') {
                        cy.step(`${tripType} ${numPassengers} Passenger(s) - Return results assertion`)
                        cy.wrap(el)
                            .children()
                            .eq(1)
                            .children()
                            .children()
                            .each((el, index) => {
                                cy.wrap(el).should('have.text', returnExpectedVal[index])
                            })
                    }
                } else {

                    cy.step(`${tripType} ${numPassengers} Passenger(s) details - results assertion`)
                    cy.wrap(el)
                        .children()
                        .each((el, index) => {
                            cy.wrap(el).should('have.text', passengersExpectedVal[index])
                        })

                }

            })
    }


    tripDatePicker = (strDate, datePickerElement) => {
        let monthValueOnField
        let numOfClicks
        const formattedDateTesting = utils.convertDateFormatv2(strDate)

        cy.get(datePickerElement).then(dateValue => {
            monthValueOnField = dateValue.val()
            numOfClicks = Number(strDate.slice(0, 2)) - Number(monthValueOnField.slice(0, 2))
            cy.get(datePickerElement).click()
            elements.datePickerButtonNext().realClick({ clickCount: numOfClicks })
            cy.get(`[aria-label="Choose ${formattedDateTesting}"]`).realClick()
        })
    }


    inputTripDetails = (cabinClass, fromValue, toValue, departDate) => {
        elements.selectCabinClass().select(cabinClass)
        elements.selectFrom().select(fromValue)
        elements.selectTo().select(toValue)
        this.tripDatePicker(departDate, elements.inputDepartElement)
    }



}


module.exports = new BookingMethods()


