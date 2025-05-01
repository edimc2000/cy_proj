/// <reference types = "cypress" />

describe('template spec', () => {

  beforeEach(() => {
    cy.visit('https://www.techglobal-training.com/frontend/form-elements')

  })

  // it('[TC01] Validate the Contact Us information', () => {
  //   // 1. Navigate to https://techglobal-training.com/frontend/form-elements
  //   // used beforeEach()

  //   // 2. Validate the heading is “Contact Us”
  //   cy.get('.is-size-3').should('have.text', 'Contact Us')

  //   // 3. Validate the address is “2800 S River Rd Suite 310, Des Plaines, IL 60018”
  //   cy.get('#address').should('have.text', '2800 S River Rd Suite 310, Des Plaines, IL 60018')

  //   // 4. Validate the email is “info@techglobalschool.com"
  //   cy.get('#email').should('have.text', 'info@techglobalschool.com')

  //   // 5. Validate the phone number is “(224) 580-2150”
  //   cy.get('#phone-number').should('have.text', '(224) 580-2150')
  // })


  // it('[TC02] Validate the Full name input box', () => {
  //   // 1. Navigate to https://techglobal-training.com/frontend/form-elements
  //   // used beforeEach()

  //   // 2. Validate that the Full name input box is displayed
  //   // 3. Validate that the Full name input box is required
  //   cy.get(':first-child > .control > .input').should('be.visible').should('have.attr', 'required')

  //   // 4. Validate that the label of the Full name input box is “Full name *”
  //   cy.get('[for="name"]').should('have.text', 'Full name *')

  //   // 5. Validate that the placeholder of the Full name input box is “Enter your full name”
  //   cy.get(':first-child > .control > .input').should('have.attr', 'placeholder', 'Enter your full name')
  // })


  it('[TC03] Validate the Gender radio button', () => {
    // 1. Navigate to https://techglobal-training.com/frontend/form-elements
    // // used beforeEach()

    // // 2. Validate the label is “Gender *”
    // cy.get('.control .label').should('have.text', 'Gender *')

    // // 3. Validate that the Gender is required
    // cy.get('.field .control .radio input').should('have.attr', 'required')

    // // 4. Validate the options are “Female”, “Male” and “Prefer not to disclose”
    // // cy.get('label.radio').should('have.', 'Male')
    // cy.get('label.radio').contains('Male')
    // cy.get('label.radio').contains('Female')
    // cy.get('label.radio').contains('Prefer not to disclose')

    // // 5. Validate the options are clickable and not selected
    // cy.get('label.radio> input')
    //   .should('be.enabled')
    //   .should('be.visible')
    //   .should('not.be.checked')
    //   .click({ multiple: true })
    //   .should('be.checked')

    // // 6. Click on the “Male” option and validate it is selected while the others are not selected
    // cy.get('label.radio')
    //   .contains('Male')
    //   .children()
    //   .check()
    //   .should('be.checked')
    //   .parent()
    //   .next()
    //   .children()
    //   .should('not.be.checked')
    //   .parent()
    //   .next()
    //   .children()
    //   .should('not.be.checked')

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

    // 5. Validate that the placeholder of the Address input box is “Enter your address *”
    cy.get(':nth-child(3)> .control > input').should('have.attr', 'placeholder', 'Enter your address')
  });


  it('[TC05] Validate the Email input box', () => {
    // 1. Navigate to https://techglobal-training.com/frontend/form-elements
    // used beforeEach()

    // 2. Validate that the Address input box is displayed
    cy.get(':nth-child(3)> .control > input').should('be.visible')

    // 3. Validate that the Address input box is not required
    cy.get(':nth-child(3)> .control > input').should('not.have.attr', 'required')

    // 4. Validate that the label of the Address input box is “Address”
    cy.get(':nth-child(3)> .label').should('have.text', 'Address')

    // 5. Validate that the placeholder of the Address input box is “Enter your address *”
    cy.get(':nth-child(3)> .control > input').should('have.attr', 'placeholder', 'Enter your address')
  });


})