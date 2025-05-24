class ShoppingCartPage {

    locators = {
        getHeadingMain: () => cy.get('.section h1.mt-2'), 
        getCardCourses: () => cy.get('[id^="course-"]')
    }
    
}

export default new ShoppingCartPage()