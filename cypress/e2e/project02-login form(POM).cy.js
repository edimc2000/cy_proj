// POM based
/// <reference types = "cypress" />

const Login = require('../../pages/loginForm.js')
const { testData } = require('./data/login-form-test-data.js')
const elements = Login.elements;

describe('TG Login Form', () => {

    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/login');
    })

    it('[TC01] Validate the login form', () => {
        Login.validateLogin()
    })

    it('[TC02] Validate the successful login', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach()

        // 2. Enter the username as “TechGlobal”
        elements.userNameInputbox().type(testData.validUserName).should('have.attr', 'value', testData.validUserName)

        // 3. Enter the password as “Test1234”
        elements.passwordInputbox().type(testData.validPassword).should('have.attr', 'value', testData.validPassword)

        // 4. Click on the “LOGIN” button
        elements.loginButton().click()

        // 5. Validate the success message is displayed as “You are logged in”
        elements.successMessage().should('be.visible').and('have.text', 'You are logged in')

        // 6. Validate the logout button displayed with the text “LOGOUT”
        elements.logoutButton().should('be.visible').and('have.text', 'LOGOUT')
    })


    it('[TC03] Validate logout', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach()

        // 2. Enter the username as “TechGlobal”
        elements.userNameInputbox().type(testData.validUserName)

        // 3. Enter the password as “Test1234”
        elements.passwordInputbox().type(testData.validPassword)

        // 4. Click on the “LOGIN” button
        elements.loginButton().click()

        // 5. Click on the “LOGOUT” button
        elements.logoutButton().click()

        // 6. Validate that the login form is displayed
        Login.validateLogin()
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
        elements.forgotPasswordLink().click()

        // 3. Enter an email
        elements.modalEmailInputbox().type(testData.emailAddress).should('have.value', testData.emailAddress)

        // 4. Click on the “SUBMIT” button
        elements.modalSubmitButton().click()

        // 6. Validate the form message “A link to reset your password has been sent to your email address.” is displayed under the “SUBMIT” button
        elements.modalConfirmationMessage()
            .should('be.visible')
            .and('have.text', 'A link to reset your password has been sent to your email address.')
    })


    it('[TC07] Validate the invalid login with the empty credentials', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach

        // 2. Leave username empty
        elements.userNameInputbox().clear()

        // 3. Leave password empty
        elements.passwordInputbox().clear()

        // 4. Click on the “LOGIN” button
        elements.loginButton().click()

        // 5. Validate the failure message is displayed as “Invalid Username entered!” above the form
        elements.errorMessage()
            .should('be.visible')
            .and('have.text', 'Invalid Username entered!')
    })

    it('[TC08] Validate the invalid login with the wrong username', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach

        // 2. Enter the username as “John”
        elements.userNameInputbox().type(testData.invalidUserName)

        // 3. Enter the password as “Test1234”
        elements.passwordInputbox().type(testData.validPassword)

        // 4. Click on the “LOGIN” button
        elements.loginButton().click()

        // 5. Validate the failure message is displayed as “Invalid Username entered!” above the form
        elements.errorMessage()
            .should('be.visible')
            .and('have.text', 'Invalid Username entered!')
    })

    it('[TC09] Validate the invalid login with the wrong password', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        //used beforeEach

        // 2. Enter the username as “TechGlobal”
        elements.userNameInputbox().type(testData.validUserName)

        // 3. Enter the password as “1234”
        elements.passwordInputbox().type(testData.invalidPassword)

        // 4. Click on the “LOGIN” button
        elements.loginButton().click()

        // 5. Validate the failure message is displayed as “Invalid Password entered!” above the form
        elements.errorMessage()
            .should('be.visible')
            .and('have.text', 'Invalid Password entered!')
    })

    it('[TC10] Validate the invalid login with the wrong username and password', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        //used beforeEach

        // 2. Enter the username as "John"
        elements.userNameInputbox().type(testData.invalidUserName)

        // 3. Enter the password as “1234”
        elements.passwordInputbox().type(testData.invalidPassword)

        // 4. Click on the “LOGIN” button
        elements.loginButton().click()

        // 5. Validate the failure message is displayed as “Invalid Username entered!” above the form
        elements.errorMessage()
            .should('be.visible')
            .and('have.text', 'Invalid Username entered!')
    })
})