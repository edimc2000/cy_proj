class ShoppingCartPage {

    locators = {
        getHeadingMain: () => cy.get('.section h1.mt-2'),
        getCardCourses: () => cy.get('[id^="course-"]'),
        getSubHeadingCartItems: () => cy.get('.mb-2'),
        getItemsOnCart: () => cy.get('.course-card'),
        getTextTotalPrice: () => cy.get('#total-price'),
        getButtonPlaceOrder: () => cy.contains('Place Order'),

        getButtonCourse1: () => cy.get('#course-1 button')
    }


    // Methods 




}

export default new ShoppingCartPage()