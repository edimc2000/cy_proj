// POM based
/// <reference types = "cypress" />

const loginPage = require('../../pages/loginFormPage.js')
const { testData } = require('./data/loginFormTestData.js')
const elements = loginPage.elements;

describe('TG Login Form', () => {
    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/login');
    })

    it('[TC01] Validate the login form', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // cy.visit('https://www.techglobal-training.com/frontend/login')

        // 2. Validate that the username input box is displayed
        // 3. Validate that the username input box is not required
         elements.userNameInputbox()
            .should('be.visible')
            .and('not.have.attr', 'required')

        // 4. Validate that the label of the username input box is “Please enter your username”
        elements.userNameInputbox()
            .parent()
            .should('have.text', 'Please enter your username')

        // 5. Validate that the password input box is displayed
        // 6. Validate that the password input box is not required
        elements.passwordInputbox()
            .should('be.visible')
            .and('not.have.attr', 'required')

        // 7. Validate that the label of the password input box is “Please enter your password”
        elements.passwordInputbox()
            .parent()
            .should('have.text', 'Please enter your password')

        // 8. Validate the “LOGIN” button is displayed
        // 9. Validate the “LOGIN” button is clickable
        // 10. Validate that the button text is “LOGIN”
        elements.loginButton()
            .should('be.visible')
            .and('be.enabled')
            .and('have.text', 'LOGIN')

        // 11. Validate the “Forgot Password?” link is displayed
        // 12. Validate that the “Forgot Password?” link is clickable
        // 13. Validate that the link text is “Forgot Password?”

        elements.forgotPasswordLink()
            .should('be.visible')
            .and('have.prop', 'tagName', 'A') // a tag for clickable assertion
            .and('have.text', 'Forgot Password?')
            .click()
        elements.modalTitle().should('be.visible') // result when it's clickable
    })

    it('[TC02] Validate the successful login', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach()

        // 2. Enter the username as “TechGlobal”
        // 3. Enter the password as “Test1234”
        // 4. Click on the “LOGIN” button
        loginPage.login(testData.validUserName, testData.validPassword)

        // 5. Validate the success message is displayed as “You are logged in”
        elements.successMessage().should('be.visible').and('have.text', 'You are logged in')

        // 6. Validate the logout button displayed with the text “LOGOUT”
        elements.logoutButton().should('be.visible').and('have.text', 'LOGOUT')
    })


    it('[TC03] Validate logout', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach()

        // 2. Enter the username as “TechGlobal”
        // 3. Enter the password as “Test1234”
        // 4. Click on the “LOGIN” button
        loginPage.login(testData.validUserName, testData.validPassword)

        // 5. Click on the “LOGOUT” button
        elements.logoutButton().click()

        // 6. Validate that the login form is displayed
        elements.userNameInputbox().should('be.visible')
        elements.passwordInputbox().should('be.visible')
    })

    it('[TC04] Validate the Forgot Password? Link and Reset Password modal', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach()

        // 2. Click on the “Forgot Password?” link
        elements.forgotPasswordLink().click()

        // 3. Validate that the modal heading “Reset Password” is displayed
        elements.modalTitle().should('be.visible').and('have.text', 'Reset Password')

        // 4. Validate that the close button is displayed
        elements.modalCloseButton().should('be.visible').and('have.attr', 'class', 'delete')

        // 5. Validate that the email input box is displayed
        elements.modalEmailInputbox().should('be.visible')

        // 6. Validate that the label of the email input box is “Enter your email address and we'll send you a link to reset your password.”
        elements.modalEmailInputbox().parent()
            .should('have.text', 'Enter your email address and we\'ll send you a link to reset your password. ')

        // 7. Validate the “SUBMIT” button is displayed
        // 8. Validate the “SUBMIT” button is clickable
        // 9. Validate that the button text is “SUBMIT”
        elements.modalSubmitButton()
            .should('be.visible')
            .and('have.text', 'SUBMIT')
            .and('not.have.attr', 'disabled')
    })

    it('[TC05] Validate the Reset Password modal close button', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        //used beforeEach()

        // 2. Click on the “Forgot Password?” link
        elements.forgotPasswordLink().click()

        // 3. Validate that the “Reset Password” modal is displayed
        elements.modalTitle().should('have.text', 'Reset Password')

        // 4. Click on the close button
        elements.modalCloseButton().should('be.visible').click()

        // 5. Validate that the “Reset Password” modal is closed
        elements.modalCard().should('not.exist')
    })

    it('[TC06] Validate the Reset Password form submission', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        //used beforeEach()

        // 2. Click on the “Forgot Password?” link
        // 3. Enter an email
        // 4. Click on the “SUBMIT” button
        loginPage.passwordReset(testData.emailAddress)

        // 6. Validate the form message “A link to reset your password has been sent to your email address.” is displayed under the “SUBMIT” button
        elements.modalConfirmationMessage()
            .should('be.visible')
            .and('have.text', 'A link to reset your password has been sent to your email address.')
    })


    it('[TC07] Validate the invalid login with the empty credentials', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach

        // 2. Leave username empty
        // 3. Leave password empty
        // 4. Click on the “LOGIN” button
        loginPage.loginEmpty()

        // 5. Validate the failure message is displayed as “Invalid Username entered!” above the form
        elements.errorMessage()
            .should('be.visible')
            .and('have.text', 'Invalid Username entered!')
    })

    it('[TC08] Validate the invalid login with the wrong username', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach

        // 2. Enter the username as “John”
        // 3. Enter the password as “Test1234”
        // 4. Click on the “LOGIN” button
        loginPage.login(testData.invalidUserName, testData.validPassword)

        // 5. Validate the failure message is displayed as “Invalid Username entered!” above the form
        elements.errorMessage()
            .should('be.visible')
            .and('have.text', 'Invalid Username entered!')
    })

    it('[TC09] Validate the invalid login with the wrong password', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        //used beforeEach

        // 2. Enter the username as “TechGlobal”
        // 3. Enter the password as “1234”
        // 4. Click on the “LOGIN” button
        loginPage.login(testData.validUserName, testData.invalidPassword)

        // 5. Validate the failure message is displayed as “Invalid Password entered!” above the form
        elements.errorMessage()
            .should('be.visible')
            .and('have.text', 'Invalid Password entered!')
    })

    it('[TC10] Validate the invalid login with the wrong username and password', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        //used beforeEach

        // 2. Enter the username as "John"
        // 3. Enter the password as “1234”
        // 4. Click on the “LOGIN” button
        loginPage.login(testData.invalidUserName, testData.invalidPassword)

        // 5. Validate the failure message is displayed as “Invalid Username entered!” above the form
        elements.errorMessage()
            .should('be.visible')
            .and('have.text', 'Invalid Username entered!')
    })
})