/// <reference types = "cypress" />


describe('FrontEnd Test - Login', () => {

    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/login')
    })

    it.only('[TC01] Validate the login form', () => {
    // 1. Navigate to https://techglobal-training.com/frontend/login

    // 2. Validate that the username input box is displayed
        cy.get('#username').should('be.visible')

    // 3. Validate that the username input box is not required
        cy.get('#username').should('not.have.attr', 'required' )

    // 4. Validate that the label of the username input box is “Please enter your username”
    cy.get('[for="username"]').should('have.text', 'Please enter your username')
    
    // Validate that the password input box is displayed
    // Validate that the password input box is not required
    // Validate that the label of the password input box is “Please enter your password”
    // Validate the “LOGIN” button is displayed
    // Validate the “LOGIN” button is clickable
    // Validate that the button text is “LOGIN”
    // Validate the “Forgot Password?” link is displayed
    // Validate that the “Forgot Password?” link is clickable
    // Validate that the link text is “Forgot Password?”
    });


})