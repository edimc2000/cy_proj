class Login {
    elements = {
        validUserName: 'TechGlobal',
        validPassword: 'Test1234',

        userNameInputbox: () => cy.get('#username'),
        passwordInputbox: () => cy.get('#password'),
        loginButton: () => cy.get('#login_btn'),
        logoutButton: () => cy.get('#logout'),
        forgotPasswordLink: () => cy.get('a[href="/frontend/login"]'),
        successMessage: () => cy.get('#success_lgn'),
    }

    validateLogin() {
        cy.log('*** function call to validate the login form ***')
        // 1. Navigate to https://techglobal-training.com/frontend/login
        // cy.visit('https://www.techglobal-training.com/frontend/login')

        // 2. Validate that the username input box is displayed
        // 3. Validate that the username input box is not required
        this.elements.userNameInputbox()
            .should('be.visible')
            .and('not.have.attr', 'required')

        // 4. Validate that the label of the username input box is “Please enter your username”
        this.elements.userNameInputbox()
            .parent()
            .should('have.text', 'Please enter your username')

        // 5. Validate that the password input box is displayed
        // 6. Validate that the password input box is not required
        this.elements.passwordInputbox()
            .should('be.visible')
            .and('not.have.attr', 'required')

        // 7. Validate that the label of the password input box is “Please enter your password”
        this.elements.passwordInputbox()
            .parent()
            .should('have.text', 'Please enter your password')

        // 8. Validate the “LOGIN” button is displayed
        // 9. Validate the “LOGIN” button is clickable
        // 10. Validate that the button text is “LOGIN”
        this.elements.loginButton()
            .should('be.visible')
            .and('be.enabled')
            .and('have.text', 'LOGIN')

        // 11. Validate the “Forgot Password?” link is displayed
        // 12. Validate that the “Forgot Password?” link is clickable
        // 13. Validate that the link text is “Forgot Password?”
        this.elements.forgotPasswordLink()
            .should('be.visible')
            .and('have.prop', 'tagName', 'A') // a tag for clickable assertion
            .and('have.text', 'Forgot Password?')
    }

}

module.exports = new Login();