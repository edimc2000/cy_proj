/// <reference types = "cypress" />
import Login from "../../pages/loginForm";

describe('TG Login Form', () => {
    const emailAddress = 'noemail@example.com'

    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/login');
        cy.get('a[href="/frontend/login"]').as('password')

    })

    it('[TC01] Validate the login form', () => {
        Login.validateLogin()
    })

    it('[TC02] Validate the successful login', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach()

        // 2. Enter the username as “TechGlobal”
        Login.elements.userNameInputbox().type(Login.elements.validUserName).should('have.attr', 'value', Login.elements.validUserName)

        // 3. Enter the password as “Test1234”
        Login.elements.passwordInputbox().type(Login.elements.validPassword).should('have.attr', 'value', Login.elements.validPassword)

        // 4. Click on the “LOGIN” button
        Login.elements.loginButton().click()

        // 5. Validate the success message is displayed as “You are logged in”
        Login.elements.successMessage().should('be.visible').and('have.text', 'You are logged in')

        // 6. Validate the logout button displayed with the text “LOGOUT”
        Login.elements.logoutButton().should('be.visible').and('have.text', 'LOGOUT')
    })


    it.only('[TC03] Validate logout', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach()

        // 2. Enter the username as “TechGlobal”
        Login.elements.userNameInputbox().type('TechGlobal')

        // 3. Enter the password as “Test1234”
        Login.elements.passwordInputbox().type('Test1234')

        // 4. Click on the “LOGIN” button
        Login.elements.loginButton().click()

        // 5. Click on the “LOGOUT” button
        Login.elements.logoutButton().click()

        // 6. Validate that the login form is displayed
        Login.validateLogin() // this needs to be improved 
    })

    it('[TC04] Validate the Forgot Password? Link and Reset Password modal', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach()

        // 2. Click on the “Forgot Password?” link
        cy.get('@password').click()

        // 3. Validate that the modal heading “Reset Password” is displayed
        cy.get('#modal_title').should('have.text', 'Reset Password')

        // 4. Validate that the close button is displayed
        cy.get('[aria-label="close"]').should('be.visible')

        // 5. Validate that the email input box is displayed
        cy.get('#email').should('be.visible')

        // 6. Validate that the label of the email input box is “Enter your email address and we'll send you a link to reset your password.”
        cy.get('label[for="email"]').should('have.text', 'Enter your email address and we\'ll send you a link to reset your password. ')

        // 7. Validate the “SUBMIT” button is displayed
        // 8. Validate the “SUBMIT” button is clickable
        // 9. Validate that the button text is “SUBMIT”
        cy.get('#submit')
            .should('be.visible')
            .and('have.text', 'SUBMIT')
            .and('not.have.attr', 'disabled')
    })

    it('[TC05] Validate the Reset Password modal close button', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        //used beforeEach()

        // 2. Click on the “Forgot Password?” link
        cy.get('@password').click()

        // 3. Validate that the “Reset Password” modal is displayed

        cy.get('#modal_title').should('have.text', 'Reset Password')

        // 4. Click on the close button
        cy.get('[aria-label="close"]').should('be.visible').click()

        // 5. Validate that the “Reset Password” modal is closed
        cy.get('#modal_title').should('not.exist')
    })

    it('[TC06] Validate the Reset Password form submission', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        //used beforeEach()

        // 2. Click on the “Forgot Password?” link
        cy.get('@password').click()

        // 3. Enter an email
        cy.get('#email').type(emailAddress).should('have.value', emailAddress)

        // 4. Click on the “SUBMIT” button
        cy.get('#submit').click()

        // 6. Validate the form message “A link to reset your password has been sent to your email address.” is displayed under the “SUBMIT” button
        cy.get('#confirmation_message').should('have.text', 'A link to reset your password has been sent to your email address.')
    })


    it('[TC07] Validate the invalid login with the empty credentials', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach

        // 2. Leave username empty
        cy.get('#username').clear()

        // 3. Leave password empty
        cy.get('#password').clear()

        // 4. Click on the “LOGIN” button
        cy.get('#login_btn').click()

        // 5. Validate the failure message is displayed as “Invalid Username entered!” above the form
        cy.get('#error_message')
            .should('be.visible')
            .and('have.text', 'Invalid Username entered!')
    })

    it('[TC08] Validate the invalid login with the wrong username', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach

        // 2. Enter the username as “John”
        cy.get('#username').type('John')

        // 3. Enter the password as “Test1234”
        cy.get('#password').type('Test1234')

        // 4. Click on the “LOGIN” button
        cy.get('#login_btn').click()

        // 5. Validate the failure message is displayed as “Invalid Username entered!” above the form
        cy.get('#error_message')
            .should('be.visible')
            .and('have.text', 'Invalid Username entered!')
    })

    it('[TC09] Validate the invalid login with the wrong password', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        //used beforeEach

        // 2. Enter the username as “TechGlobal”
        cy.get('#username').type('TechGlobal')

        // 3. Enter the password as “1234”
        cy.get('#password').type('1234')

        // 4. Click on the “LOGIN” button
        cy.get('#login_btn').click()

        // 5. Validate the failure message is displayed as “Invalid Password entered!” above the form
        cy.get('#error_message')
            .should('be.visible')
            .and('have.text', 'Invalid Password entered!')
    })

    it('[TC10] Validate the invalid login with the wrong username and password', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        //used beforeEach

        // 2. Enter the username as "John"
        cy.get('#username').type('John')

        // 3. Enter the password as “1234”
        cy.get('#password').type('1234')

        // 4. Click on the “LOGIN” button
        cy.get('#login_btn').click()

        // 5. Validate the failure message is displayed as “Invalid Username entered!” above the form
        cy.get('#error_message')
            .should('be.visible')
            .and('have.text', 'Invalid Username entered!')
    })
})