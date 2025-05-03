/// <reference types = "cypress" />

describe('template spec', () => {

    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/login')
    })

/*
    it('[TC01] Validate the login form', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach()

        // 2. Validate that the username input box is displayed
        // 3. Validate that the username input box is not required
        cy.get('#username')
            .should('be.visible')
            .should('not.have.attr', 'required')

        // 4. Validate that the label of the username input box is “Please enter your username”
        cy.get('#username')
            .parent()
            .should('have.text', 'Please enter your username')

        // 5. Validate that the password input box is displayed
        // 6. Validate that the password input box is not required
        cy.get('#password')
            .should('be.visible')
            .should('not.have.attr', 'required')

        // 7. Validate that the label of the password input box is “Please enter your password”
        cy.get('#password')
            .parent()
            .should('have.text', 'Please enter your password')

        // 8. Validate the “LOGIN” button is displayed
        // 9. Validate the “LOGIN” button is clickable
        // 10. Validate that the button text is “LOGIN”
        cy.get('#login_btn')
            .should('be.visible')
            .should('be.enabled')
            .should('have.text', 'LOGIN')

        // 11. Validate the “Forgot Password?” link is displayed
        // 12. Validate that the “Forgot Password?” link is clickable
        // 13. Validate that the link text is “Forgot Password?”
        cy.get('[href="/frontend/login"]')
            .should('be.visible')
            .should('have.attr', 'href', '/frontend/login')
            .should('have.text', 'Forgot Password?')
    })

    it('[TC02] Validate the successful login', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach()

        // 2. Enter the username as “TechGlobal”
        cy.get('#username').type('TechGlobal')

        // 3. Enter the password as “Test1234”
        cy.get('#password').type('Test1234')

        // 4. Click on the “LOGIN” button
        cy.get('#login_btn').click()

        // 5. Validate the success message is displayed as “You are logged in”
        cy.get('#success_lgn').should('be.visible').should('have.text', 'You are logged in')

        // 6. Validate the logout button displayed with the text “LOGOUT”
        cy.get('#logout').should('be.visible').should('have.text', 'LOGOUT')
    })
*/
    it('[TC03] Validate logout', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach()

        // 2. Enter the username as “TechGlobal”
        cy.get('#username').type('TechGlobal')

        // 3. Enter the password as “Test1234”
        cy.get('#password').type('Test1234')

        // 4. Click on the “LOGIN” button
        cy.get('#login_btn').click()

        // 5. Click on the “LOGOUT” button
        cy.get('#logout').click()

        // 6. Validate that the login form is displayed



    });

})