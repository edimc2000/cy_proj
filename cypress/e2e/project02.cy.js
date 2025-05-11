/// <reference types = "cypress" />
require('cypress-plugin-steps')
const loginPage = require('../pages/loginFormPage.js')
const { testData } = require('./data/loginFormTestData.js')
const elements = loginPage.elements

describe('TG Login Form', () => {
    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/login');
    })

    it.only('[TC01] Validate the login form', () => {
        // steps 2 to 7    
        elements.divLabels().each((el, index) => {
            cy.wrap(el)
                .should('be.visible')
                .and('have.text', testData.inputlabels[index])
                .next()
                .should('be.visible')
                .and('be.enabled')
                .and('not.have.attr', 'required')
        })

        // steps 8 to 10
        elements.loginButton()
            .should('be.visible')
            .and('be.enabled')
            .and('have.text', testData.loginButtonlabel)

        // steps 11 to 13 
        elements.forgotPasswordLink()
            .should('be.visible')
            .and('have.prop', 'tagName', 'A') // a tag for clickable assertion
            .and('have.text', testData.forgotLabel)
            .click()
        elements.modalTitle().should('be.visible') // secondary assertion for the link, when it's clickable
    })

    it('[TC02] Validate the successful login', () => {
        //steps 2-4 
        cy.step('Login with a valid account')
        loginPage.login(testData.validUserName, testData.validPassword)

        //steps 5 -6 
        cy.step('Validation when logged in ')
        elements.successMessage().should('be.visible').and('have.text', testData.successMessage)
        elements.logoutButton().should('be.visible').and('be.enabled').and('have.text', testData.logoutButtonlabel)
    })


    it('[TC03] Validate logout', () => {
        //steps 2-4
        cy.step('Login with a valid account')
        loginPage.login(testData.validUserName, testData.validPassword)

        //step 5
        elements.logoutButton().click()

        //step 6
        elements.userNameInputbox().should('be.visible')
        elements.passwordInputbox().should('be.visible')
    })

    it('[TC04] Validate the Forgot Password? Link and Reset Password modal', () => {
        elements.forgotPasswordLink().click()

        //steps 3-6 
        elements.modalTitle().should('be.visible').and('have.text', 'Reset Password')
        elements.modalCloseButton().should('be.visible').and('have.attr', 'class', 'delete')
        elements.modalEmailInputbox().should('be.visible')
        elements.modalEmailInputbox().parent()
            .should('have.text', testData.paswordResetLabel)

        //steps 7-9
        elements.modalSubmitButton()
            .should('be.visible')
            .and('have.text', 'SUBMIT')
            .and('not.have.attr', 'disabled')
    })

    it('[TC05] Validate the Reset Password modal close button', () => {
        elements.forgotPasswordLink().click()

        //steps 3-5
        elements.modalTitle().should('have.text', testData.modelResetPasswordTitle)
        elements.modalCloseButton().should('be.visible').click()
        elements.modalCard().should('not.exist')
    })

    it('[TC06] Validate the Reset Password form submission', () => {
        //steps 2-6
        loginPage.passwordReset(testData.emailAddress)
        elements.modalConfirmationMessage()
            .should('be.visible')
            .and('have.text', testData.paswordResetSumittedLabel)
    })


    it('[TC07] Validate the invalid login with the empty credentials', () => {
        //steps 2-4
        loginPage.loginEmpty()

        //step 5
        elements.errorMessage()
            .should('be.visible')
            .and('have.text', testData.errorMessageUsername)
    })

    it('[TC08] Validate the invalid login with the wrong username', () => {
        //steps 2-4
        loginPage.login(testData.invalidUserName, testData.validPassword)

        //step 5
        elements.errorMessage()
            .should('be.visible')
            .and('have.text', testData.errorMessageUsername)
    })

    it.only('[TC09] Validate the invalid login with the wrong password', () => {
        //steps 2-4
        loginPage.login(testData.validUserName, testData.invalidPassword)

        //step 5
        elements.errorMessage()
            .should('be.visible')
            .and('have.text', testData.errorMessagePassword)
    })

    it('[TC10] Validate the invalid login with the wrong username and password', () => {
        //steps 2-4
        loginPage.login(testData.invalidUserName, testData.invalidPassword)

        //step 5
        elements.errorMessage()
            .should('be.visible')
            .and('have.text', testData.errorMessageUsername)
    })
})