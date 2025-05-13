class LoginPage {
    elements = {
        getUserNameInputbox: () => cy.get('#username'),
        getPasswordInputbox: () => cy.get('#password'),

        getLoginButton: () => cy.get('#login_btn'),
        getLogoutButton: () => cy.get('#logout'),

        getForgotPasswordLink: () => cy.get('a[href="/frontend/login"]'),
        successMessage: () => cy.get('#success_lgn'),
        errorMessage: () => cy.get('#error_message'),

        getModalCard: () => cy.get('.modal .modal-card'),
        getModalTitle: () => cy.get('#modal_title'),
        getModalCloseButton: () => cy.get('[aria-label="close"]'),
        getModalEmailInputbox: () => cy.get('#email'),
        getModalSubmitButton: () => cy.get('#submit'),
        getModalConfirmationMessage: () => cy.get('#confirmation_message'),

        getDivLabels : () => cy.get('div label'),
    }

    login(username, password){
        this.elements.getUserNameInputbox().type(username).should('have.value', username)
        this.elements.getPasswordInputbox().type(password).should('have.value', password)
        this.elements.getLoginButton().click()
    }

    loginEmpty() {
        this.elements.getUserNameInputbox().clear()
        this.elements.getPasswordInputbox().clear()
        this.elements.getLoginButton().click()
    }
    
    passwordReset(email) {
        this.elements.getForgotPasswordLink().click()
        this.elements.getModalEmailInputbox().type(email).should('have.value', email)
        this.elements.getModalSubmitButton().click()
    }
}

module.exports = new LoginPage()
