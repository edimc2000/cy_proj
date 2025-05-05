// POM based
/// <reference types = "cypress" />
import Login from "../../pages/loginForm";

describe('TG Login Form', () => {
    const emailAddress = 'noemail@example.com'

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


    it('[TC03] Validate logout', () => {
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
        Login.elements.forgotPasswordLink().click()

        // 3. Validate that the modal heading “Reset Password” is displayed
        Login.elements.modalTitle().should('be.visible').and('have.text', 'Reset Password')

        // 4. Validate that the close button is displayed
        Login.elements.modalCloseButton().should('be.visible').and('have.attr', 'class', 'delete')

        // 5. Validate that the email input box is displayed
        Login.elements.modalEmailInputbox().should('be.visible')

        // 6. Validate that the label of the email input box is “Enter your email address and we'll send you a link to reset your password.”
        Login.elements.modalEmailInputbox().parent()
            .should('have.text', 'Enter your email address and we\'ll send you a link to reset your password. ')

        // 7. Validate the “SUBMIT” button is displayed
        // 8. Validate the “SUBMIT” button is clickable
        // 9. Validate that the button text is “SUBMIT”
        Login.elements.modalSubmitButton()
            .should('be.visible')
            .and('have.text', 'SUBMIT')
            .and('not.have.attr', 'disabled')
    })

    it('[TC05] Validate the Reset Password modal close button', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        //used beforeEach()

        // 2. Click on the “Forgot Password?” link
        Login.elements.forgotPasswordLink().click()

        // 3. Validate that the “Reset Password” modal is displayed
        Login.elements.modalTitle().should('have.text', 'Reset Password')

        // 4. Click on the close button
        Login.elements.modalCloseButton().should('be.visible').click()

        // 5. Validate that the “Reset Password” modal is closed
        Login.elements.modalCard().should('not.exist')
    })

    it('[TC06] Validate the Reset Password form submission', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        //used beforeEach()

        // 2. Click on the “Forgot Password?” link
        Login.elements.forgotPasswordLink().click()

        // 3. Enter an email
        Login.elements.modalEmailInputbox().type(emailAddress).should('have.value', emailAddress)

        // 4. Click on the “SUBMIT” button
        Login.elements.modalSubmitButton().click()

        // 6. Validate the form message “A link to reset your password has been sent to your email address.” is displayed under the “SUBMIT” button
        Login.elements.modalConfirmationMessage()
            .should('be.visible')
            .and('have.text', 'A link to reset your password has been sent to your email address.')
    })


    it('[TC07] Validate the invalid login with the empty credentials', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach

        // 2. Leave username empty
        Login.elements.userNameInputbox().clear()

        // 3. Leave password empty
        Login.elements.passwordInputbox().clear()

        // 4. Click on the “LOGIN” button
        Login.elements.loginButton().click()

        // 5. Validate the failure message is displayed as “Invalid Username entered!” above the form
        Login.elements.errorMessage()
            .should('be.visible')
            .and('have.text', 'Invalid Username entered!')
    })

    it('[TC08] Validate the invalid login with the wrong username', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // used beforeEach

        // 2. Enter the username as “John”
        Login.elements.userNameInputbox().type(Login.elements.invalidUserName)

        // 3. Enter the password as “Test1234”
        Login.elements.passwordInputbox().type(Login.elements.validPassword)

        // 4. Click on the “LOGIN” button
        Login.elements.loginButton().click()

        // 5. Validate the failure message is displayed as “Invalid Username entered!” above the form
        Login.elements.errorMessage()
            .should('be.visible')
            .and('have.text', 'Invalid Username entered!')
    })

    it.only('[TC09] Validate the invalid login with the wrong password', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        //used beforeEach

        // 2. Enter the username as “TechGlobal”
        Login.elements.userNameInputbox().type(Login.elements.validUserName)

        // 3. Enter the password as “1234”
        Login.elements.passwordInputbox().type(Login.elements.invalidPassword)

        // 4. Click on the “LOGIN” button
        Login.elements.loginButton().click()

        // 5. Validate the failure message is displayed as “Invalid Password entered!” above the form
        Login.elements.errorMessage()
            .should('be.visible')
            .and('have.text', 'Invalid Password entered!')
    })

    it.only('[TC10] Validate the invalid login with the wrong username and password', () => {
        // 1. Navigate to https://techglobal-training.com/frontend/login
        //used beforeEach

        // 2. Enter the username as "John"
        Login.elements.userNameInputbox().type(Login.elements.invalidUserName)

        // 3. Enter the password as “1234”
        Login.elements.passwordInputbox().type(Login.elements.invalidPassword)

        // 4. Click on the “LOGIN” button
        Login.elements.loginButton().click()

        // 5. Validate the failure message is displayed as “Invalid Username entered!” above the form
        Login.elements.errorMessage()
            .should('be.visible')
            .and('have.text', 'Invalid Username entered!')
    })
})