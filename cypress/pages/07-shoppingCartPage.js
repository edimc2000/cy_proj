
class ShoppingCartPage {

    locators = {
        getHeadingMain: () => cy.get('.section h1.mt-2'),
        getCardCourses: () => cy.get('[id^="course-"]'),
        getSubHeadingCartItems: () => cy.get('.mb-2'),
        getItemsOnCart: () => cy.get('.course-card'),
        getTextTotalPrice: () => cy.get('#total-price'),
        getButtonPlaceOrder: () => cy.contains('Place Order'),
        getContainerOderConfirmation: () => cy.get('.notification'),

        getButtonCourse0: () => cy.get('#course-1 button')

    }


    // Methods 
    addProgramToCart = str => {
        cy.contains(str)
            .parent()
            .parent()
            .next()
            .contains('Add to Cart')
            .click()
    }



}

export default new ShoppingCartPage()