/// <reference types = "cypress" />

describe('template spec', () => {

  beforeEach(() => {
    cy.visit('https://www.techglobal-training.com/frontend/form-elements')
  })

  it('[TC01] Validate the Contact Us information', () => {
    // 1. Navigate to https://techglobal-training.com/frontend/form-elements
    // used beforeEach()

    // 2. Validate the heading is “Contact Us”
    cy.get('.is-size-3').should('have.text', 'Contact Us')

    // 3. Validate the address is “2800 S River Rd Suite 310, Des Plaines, IL 60018”
    cy.get('#address').should('have.text', '2800 S River Rd Suite 310, Des Plaines, IL 60018')

    // 4. Validate the email is “info@techglobalschool.com"
    cy.get('#email').should('have.text', 'info@techglobalschool.com')

    // 5. Validate the phone number is “(224) 580-2150”
    cy.get('#phone-number').should('have.text', '(224) 580-2150')
  })


  it('[TC02] Validate the Full name input box', () => {
    // 1. Navigate to https://techglobal-training.com/frontend/form-elements
    // used beforeEach()

    // 2. Validate that the Full name input box is displayed
    // 3. Validate that the Full name input box is required
    cy.get(':first-child > .control > .input').should('be.visible').should('have.attr', 'required')

    // 4. Validate that the label of the Full name input box is “Full name *”
    cy.get('[for="name"]').should('have.text', 'Full name *')

    // 5. Validate that the placeholder of the Full name input box is “Enter your full name”
    cy.get(':first-child > .control > .input').should('have.attr', 'placeholder', 'Enter your full name')
  })


  it('[TC03] Validate the Gender radio button', () => {
    // 1. Navigate to https://techglobal-training.com/frontend/form-elements
    // used beforeEach()

    // 2. Validate the label is “Gender *”
    cy.get('.control .label').should('have.text', 'Gender *')

    // 3. Validate that the Gender is required
    cy.get('.field .control .radio input').should('have.attr', 'required')

    // 4. Validate the options are “Female”, “Male” and “Prefer not to disclose”
    // cy.get('label.radio').should('have.', 'Male')
    cy.get('label.radio').contains('Male')
    cy.get('label.radio').contains('Female')
    cy.get('label.radio').contains('Prefer not to disclose')

    // 5. Validate the options are clickable and not selected
    cy.get('label.radio> input')
      .should('be.enabled')
      .should('be.visible')
      .should('not.be.checked')
      .click({ multiple: true })
      .should('be.checked')

    // 6. Click on the “Male” option and validate it is selected while the others are not selected
    cy.get('label.radio')
      .contains('Male')
      .children()
      .check()
      .should('be.checked')
      .parent()
      .next()
      .children()
      .should('not.be.checked')
      .parent()
      .next()
      .children()
      .should('not.be.checked')

    // 7. Click on the “Female” option and validate it is selected while the others are not selected
    cy.get('label.radio')
      .contains('Female')
      .children()
      .check()
      .should('be.checked')
      .parent()
      .prev()
      .children()
      .should('not.be.checked')
      .parent()
      .next()
      .next()
      .children()
      .should('not.be.checked')
  })

  it('[TC04] Validate the Address input box', () => {
    // 1. Navigate to https://techglobal-training.com/frontend/form-elements
    // used beforeEach()

    // 2. Validate that the Address input box is displayed
    cy.get(':nth-child(3)> .control > input').should('be.visible')

    // 3. Validate that the Address input box is not required
    cy.get(':nth-child(3)> .control > input').should('not.have.attr', 'required')

    // 4. Validate that the label of the Address input box is “Address”
    cy.get(':nth-child(3)> .label').should('have.text', 'Address')

    // 5. Validate that the placeholder of the Address input box is “Enter your address *” // possibly wrong acceptance criteria with the * 
    cy.get(':nth-child(3)> .control > input').should('have.attr', 'placeholder', 'Enter your address')
  });


  it('[TC05] Validate the Email input box', () => {
    // 1. Navigate to https://techglobal-training.com/frontend/form-elements
    // used beforeEach()

    // 2. Validate that the Email input box is displayed
    cy.get(':nth-child(4)> .control > input').should('be.visible')

    // 3. Validate that the Email input box is required
    cy.get(':nth-child(4)> .control > input').should('have.attr', 'required')

    // 4. Validate that the label of the Email input box is “Email *”
    cy.get(':nth-child(4)> .label').should('have.text', 'Email *')

    // 5. Validate that the placeholder of the Email input box is “Enter your email”
    cy.get(':nth-child(4)> .control > input').should('have.attr', 'placeholder', 'Enter your email')
  });


  it('[TC06] Validate the Phone input box', () => {
    // 1. Navigate to https://techglobal-training.com/frontend/form-elements
    // used beforeEach()

    // 2. Validate that the Phone input box is displayed
    cy.get(':nth-child(5)> .control > input').should('be.visible')

    // 3. Validate that the Phone input box is not required
    cy.get(':nth-child(5)> .control > input').should('not.have.attr', 'required')

    // 4. Validate that the label of the Phone input box is “Phone”
    cy.get(':nth-child(5)> .label').should('have.text', 'Phone')

    // 5. Validate that the placeholder of the Address input box is “Enter your phone number”
    cy.get(':nth-child(5)> .control > input').should('have.attr', 'placeholder', 'Enter your phone number')
  });

  it('[TC07] Validate the Message text area', () => {
    // 1. Navigate to https://techglobal-training.com/frontend/form-elements
    // used beforeEach()

    // 2. Validate that the Message text area is displayed
    cy.get(':nth-child(6)> .control > textarea').should('be.visible')

    // 3. Validate that the Message text area is not required
    cy.get(':nth-child(6)> .control > textarea').should('not.have.attr', 'required')

    // 4. Validate that the label of the Message text area is “Message”
    cy.get(':nth-child(6)> .label').should('have.text', 'Message')

    // 5. Validate that the placeholder of the Message text area is “Type your message here…”
    cy.get(':nth-child(6)> .control > textarea').should('have.attr', 'placeholder', 'Type your message here...')
  });

  it('[TC08] Validate the Consent checkbox', () => {
    // 1. Navigate to https://techglobal-training.com/frontend/form-elements
    // used beforeEach()

    // 2. Validate the label is “I give my consent to be contacted.”
    cy.get(':nth-child(7)> .control .checkbox').contains('I give my consent to be contacted.')

    // 3. Validate that the Consent checkbox is required
    cy.get(':nth-child(7)> .control .checkbox > input').should('have.attr', 'required')

    // 4. Validate that the Consent checkbox is clickable
    cy.get(':nth-child(7)> .control .checkbox > input')
      .should('be.enabled')
      .should('be.visible')
      .should('not.be.checked')
      .check()
      .should('be.checked')
      .uncheck()
      .should('not.be.checked')

    // 5. Click on the “I give my consent to be contacted.” checkbox and validate it is selected
    // 6. Click on the “I give my consent to be contacted.” checkbox again and validate it is not selected
    cy.get(':nth-child(7)> .control .checkbox > input')
      .click()
      .should('be.checked')
      .click()
      .should('not.be.checked')
  });


  it('[TC09] Validate the SUBMIT button', () => {
    // 1. Navigate to https://techglobal-training.com/frontend/form-elements
    // used beforeEach()

    // 2. Validate the “SUBMIT” button is displayed
    cy.get(':nth-child(8) > .control button').should('be.visible')

    // 3. Validate the “SUBMIT” button is clickable
    cy.get(':nth-child(8) > .control button').should('be.enabled')

    // 4. Validate that the button text is “SUBMIT”
    cy.get(':nth-child(8) > .control button').should('have.text', 'SUBMIT')
  });

  it('[TC10] Validate the form submission', () => {
    // 1. Navigate to https://techglobal-training.com/frontend/form-elements
    // used beforeEach()

    // 2. Enter a first name
    cy.get(':first-child > .control > .input').type('Peter Paul')

    // 3. Select a gender
    cy.get('label.radio').contains('Prefer not to disclose').children().check()

    // 4. Enter an address
    cy.get(':nth-child(3)> .control > input').type('1935 Sargent Avenue, Winnipeg, MB R3B 1T7')

    // 5. Enter an email
    cy.get(':nth-child(4)> .control > input').type('peter.paul88@gmail.com')

    // 6. Enter a phone number
    cy.get(':nth-child(5)> .control > input').type('204 222 4588')

    // 7. Enter a message
    cy.get(':nth-child(6)> .control > textarea').click()
      .type('Lorem Ipsum is simply dummy text of the printing and typesetting industry.')
      .type(' It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.')
    cy.wait(1000)

    // 8. Select the “I give my consent to be contacted.” checkbox
    cy.get(':nth-child(7)> .control .checkbox > input').check()
    cy.wait(1000)

    // 9. Click on the “SUBMIT” button
    cy.get(':nth-child(8) > .control button').click()

    // 10. Validate the form message “Thanks for submitting!” is displayed under the “SUBMIT” button
    cy.contains('Thanks for submitting!')

    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from failing the test
      return false
    })

  });




})