// POM based
/// <reference types = "cypress" />
require('cypress-plugin-steps')

const Booking = require('../../pages/bookingFormPage.js')
const testData = require('./data/bookingFormTestData.js')
const elements = Booking.elements;

describe('TG Booking Form', () => {

    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/booking');
    })

    it.only('[TC01] Validate the default Book your trip form', () => {

        { // validates labels' visibility and string value, validates inputs' 
            // clickability, visibility and default values and states 
            elements.divLabels().each((el, index) => {
                const labelText = el.text()
                const labelObj = testData.divs[labelText]
                const labelObjAssert = testData.divs[labelText].assertInputElement
                cy.section(`VALIDATING ${labelText} label and input elements`)
                if (labelText === testData.divs[labelText].labelName) {
                    if (labelText === testData.mainLabelException) {
                        elements.radioButtons().each(el => {
                            const radioText = el.text()
                            const radioObj = testData.radioButtons[radioText]

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
                                    cy.wrap(el).find('[type="text"]')
                                        .should(labelObjAssert.assertEnabled)
                                        .and(labelObjAssert.assertVisibility)
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
    })


})