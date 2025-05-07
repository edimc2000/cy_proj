// POM based
/// <reference types = "cypress" />

const Booking = require('../../pages/bookingFormPage.js')
const testData = require('./data/bookingFormTestData.js')
const elements = Booking.elements;

describe('TG Booking Form', () => {

    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/booking');
    })

    // it('[TC01] Validate the default Book your trip form', () => {
    //     // 1. Navigate to https://techglobal-training.com/frontend/booking
    //     // used beforeEach()

    //     // 2. Validate that the “One way” radio button is displayed enabled and selected by default
    //     elements.radioButtonOneWay()
    //         .should('be.visible')
    //         .and('be.enabled')
    //         .and('be.checked')

    //     // 3. Validate that the “Round trip” radio button is displayed enabled and not selected by default
    //     elements.radioButtonRoundTrip()
    //         .should('be.visible')
    //         .and('be.enabled')
    //         .and('not.be.checked')

    //     // 4. Validate that the “Cabin Class” label and dropdown are displayed
    //     elements.labelCabinClass()
    //         .should('be.visible')
    //         .and('have.text', 'Cabin Class')

    //     elements.selectCabinClass()
    //         .should('be.visible')
    //         .and('have.value', 'Select cabin class...')


    //     // 5. Validate that the “From” label and dropdown are displayed
    //     elements.labelFrom()
    //         .should('be.visible')
    //         .and('have.text', 'From')

    //     elements.selectFrom()
    //         .should('be.visible')
    //         .and('have.value', 'Select state...')

    //     // 6. Validate that the “To” label and dropdown are displayed
    //     elements.labelTo()
    //         .should('be.visible')
    //         .and('have.text', 'To')

    //     elements.selectTo()
    //         .should('be.visible')
    //         .and('have.value', 'Select state...')

    //     // 7. Validate that the “Depart” label and date picker is displayed

    //     elements.labelDepart()
    //         .should('be.visible')
    //         .and('have.text', 'Depart')

    //     elements.inputDepart()
    //         .should('be.enabled')
    //         .should('be.visible')
    //         .click()

    //     elements.divDatePicker()
    //         .should('exist')

    //     elements.labelDepart().click() // click somewhere to close the date picker

    //     // 8. Validate that the “Return” label and date picker is displayed and disabled
    //     elements.labelReturn()
    //         .should('be.visible')
    //         .and('have.text', 'Return')

    //     elements.inputreturn()
    //         .should('be.disabled')
    //         .should('be.visible')

    //     // 9. Validate that the “Number of passengers” label and dropdown are displayed and 1 is the default
    //     elements.labelNumPassengers()
    //         .should('be.visible')
    //         .and('have.text', 'Number of passengers')

    //     elements.selectNumPassengers()
    //         .should('be.visible')
    //         .and('have.value', '1')

    //     // 10. Validate that the “Passenger 1” category label and dropdown are displayed and “Adult (16-64)” is the default
    //     elements.labelPassenger1()
    //         .should('be.visible')
    //         .and('have.text', 'Passenger 1')

    //     elements.selectPassenger1()
    //         .should('be.visible')
    //         .and('have.value', 'Adult (16-64)')

    //     // 11.Validate that the “BOOK” button is displayed and enabled
    //     elements.buttonBook()
    //         .should('be.visible')
    //         .and('be.enabled')
    // })


    it.only('try labels with each', () => {
        elements.divLabels().each((el, index) => {
            const labelText = el.text()
            
            if(labelText === testData.divs[labelText].labelName) {
                if (labelText === testData.mainLabelException){
                    elements.radioButtons() /*********   USE EACh To BE CONTINUED  */

                } else {
                cy.wrap(el)
                    .should('be.visible')
                    .and('have.text', testData.divs[labelText].labelName)
                    
                cy.log('MAIN LABEL assertions  visibility and string matching ')

                }

            }

        })
    })


})