// POM based
/// <reference types = "cypress" />
require('cypress-plugin-steps')

const Booking = require('../pages/bookingFormPage.js')
const testData = require('./data/bookingFormTestData.js')
const elements = Booking.elements;

describe('TG Booking Form', () => {

    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/booking');
    })

    it('[TC01] Validate the default Book your trip form', () => {
        validateBookingForm('One Way')
    })

    it('[TC02] Validate the Book your trip form when Round trip is selected', () => {
        elements.radioRT().check()
        validateBookingForm('Round trip')
    })

    it('[TC03] Validate the booking for 1 passenger and one way', () => {
        bookTrip('One Way', 'Business', 'IL', 'FL', '1', null, null, 'Senior (65+)')
    })
    it('[TC04] Validate the booking for 1 passenger and round trip', () => {
        bookTrip('Round trip', 'First', 'CA', 'IL', '1', '06/01/2025', '06/25/2025')
    })

    it('[TC05] Validate the booking for 2 passengers and one way', () => {
        bookTrip('One Way', 'Premium Economy', 'NY', 'TX', '2', '05/09/2025', '06/25/2025')
    })
})


const bookTrip = (tripTypeInput, cabinClassInput, fromInput, toInput, numPassengersInput, departDateInput, returnDateInput, passenger1Input) => {
    cy.section(`Input trip details`)
    const tripDate = testDates()

    const cabinClass = cabinClassInput
    const fromValue = fromInput
    const toValue = toInput
    const numPassengers = numPassengersInput ?? 1
    const departDate = departDateInput ?? tripDate.dDate
    const returnDate = returnDateInput ?? tripDate.rDate
    const tripType = tripTypeInput ?? 'One way'
    passenger1Input = passenger1Input ?? testData.divs['Passenger 1'].defaultValue

    const departDateFormattted = convertDateFormat(departDate)
    const returnDateFormattted = convertDateFormat(returnDate)

    if (tripType === 'Round trip') {
        elements.radioRT().check()
        elements.inputReturn().clear().type(returnDate)
    } else {
        elements.radioOW().check()
    }

    if (numPassengers > 1) {
        elements.selectNumPassengers().select(numPassengers)
        for (let i = 2; i <= numPassengers; i++) {
            elements['selectPassenger' + [i]]().select(testData.divs['Passenger ' + [i]].defaultValue)
        }
    } else {
        elements.selectNumPassengers().select(numPassengers)
    }

    elements.selectCabinClass().select(cabinClass)
    elements.selectFrom().select(fromValue)
    elements.selectTo().select(toValue)
    elements.inputDepart().clear().type(departDate)
    elements.root().click()
    elements.selectPassenger1().select(passenger1Input)

    elements.buttonBook().click()

    let summaryContainers = 0

    elements.divSummary()
        .each(el => {
            summaryContainers += 1

            if (summaryContainers === 1) {
                cy.step(`${tripType} ${numPassengers} Passenger(s) - Depart results assertion`)
                cy.wrap(el)
                    .children()
                    .eq(0).should('have.text', `DEPART${fromValue} to ${toValue}${departDateFormattted}`)

                if (tripType === 'Round trip') {
                    cy.step(`${tripType} ${numPassengers} Passenger(s) - Return results assertion`)
                    cy.wrap(el)
                        .children()
                        .eq(0)
                        .next().should('have.text', `RETURN${toValue} to ${fromValue}${returnDateFormattted}`)
                }
            } else {
                let passengerSummary = `Number of Passengers: ${numPassengers}`
                for (let i = 1; i <= numPassengers; i++) {
                    i > 1 ? passengerSummary += `Passenger ${i}: ${testData.divs['Passenger ' + [i]].defaultValue}`
                        : passengerSummary += `Passenger ${i}: ${passenger1Input}`
                    cy.log('********* >>', `Passenger ${i}`, testData.divs['Passenger ' + [i]].defaultValue)
                }
                passengerSummary += `Cabin class: ${cabinClass}`
                cy.step(`${tripType} ${numPassengers} Passenger(s) details - results assertion`)
                cy.wrap(el)
                    .children()
                    .should('have.text', passengerSummary)
            }

        })
}

const testDates = () => {
    /*
     checks date now 05/08/2025 and output date after 7 days and 30 days later 
     example {dDate: '05/15/2025', rDate: '06/15/2025'} 
    */

    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    const nextMonth = new Date()
    nextMonth.setDate(nextMonth.getDate() + 30)

    const fourWeeks = (nextMonth.getMonth() + 1).toString().padStart(2, '0')
    const month = (nextWeek.getMonth() + 1).toString().padStart(2, '0')
    const day = nextWeek.getDate().toString().padStart(2, '0')
    const year = nextWeek.getFullYear().toString()//.slice(-2)

    const tripDate = {
        dDate: `${month}/${day}/${year}`,
        rDate: `${fourWeeks}/${day}/${year}`
    }

    return tripDate

}


const convertDateFormat = dateStr => {
    //  input 05/09/2025   - result Fri May 09 2025
    const [month, day, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    }).replace(/,/g, ''); 
}



const validateBookingForm = (radio) => {
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
                                    cy.log('*/*/*/*/*/*/*/*/*/*/*/*/*/*/')
                                    cy.wrap(el).find('[type="text"]')
                                        .should(labelObjAssert.assertVisibility)
                                        .should(labelObjAssert.assertEnabledRT)
                                } else {
                                    cy.wrap(el).find('[type="text"]')
                                        .and(labelObjAssert.assertVisibility)
                                        .should(labelObjAssert.assertEnabled)
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