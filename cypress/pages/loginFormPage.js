class LoginPage {
    elements = {
        userNameInputbox: () => cy.get('#username'),
        passwordInputbox: () => cy.get('#password'),

        loginButton: () => cy.get('#login_btn'),
        logoutButton: () => cy.get('#logout'),

        forgotPasswordLink: () => cy.get('a[href="/frontend/login"]'),
        successMessage: () => cy.get('#success_lgn'),
        errorMessage: () => cy.get('#error_message'),

        modalCard: () => cy.get('.modal .modal-card'),
        modalTitle: () => cy.get('#modal_title'),
        modalCloseButton: () => cy.get('[aria-label="close"]'),
        modalEmailInputbox: () => cy.get('#email'),
        modalSubmitButton: () => cy.get('#submit'),
        modalConfirmationMessage: () => cy.get('#confirmation_message'),
    }

    login(username, password) {
        this.elements.userNameInputbox().type(username)
        this.elements.passwordInputbox().type(password)
        this.elements.loginButton().click()
    }

    loginEmpty() {
        this.elements.userNameInputbox().clear()
        this.elements.passwordInputbox().clear()
        this.elements.loginButton().click()
    }
    
    passwordReset(email) {
        this.elements.forgotPasswordLink().click()
        this.elements.modalEmailInputbox().type(email)
        this.elements.modalSubmitButton().click()
    }
}

module.exports = new LoginPage()
