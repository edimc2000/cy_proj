/// <reference types = "cypress" />
const neatCSV = require('neat-csv')
import 'cypress-plugin-steps'
import 'cypress-real-events'
import '../pages/06-toDoListPage'
import shoppingCartPage from '../pages/07-shoppingCartPage'


describe('TG Shopping Cart', () => {
    const locators = shoppingCartPage.locators
    let shoppingcartItems

    before(() => {
        cy.fixture('07-shoppingCartSampleData').then(neatCSV).then(data => {
            shoppingcartItems = data
            console.table(shoppingcartItems)
        })
    })

    beforeEach(() => {
        cy.visit('https://techglobal-training.com/frontend/shopping-cart')
    })

    /*
    [TC01] - Available Courses Section Validation
    1 * Navigate to https://techglobal-training.com/frontend/shopping-cart
    2 * Validate the heading is “Available Courses”
    3 * Validate that there are 3 courses displayed
    4 * Validate that each course has an image, name, TechGlobal School tag, and a price of more than zero
    5 * Validate the first 2 courses have discount tags
    6 Validate that there is an “Add to Cart” button under each course which is displayed, enabled, and has the text “Add to Cart”
    */

    it('[TC01] - Available Courses Section Validation', () => {
        locators.getHeadingMain().should('have.text', 'Available Courses')
        locators.getCardCourses().each((card, index) => {

            cy.wrap(card).children().first()
                .children().first()  // this is for the image 
                .should('be.visible')
                .and('have.attr', 'src', shoppingcartItems[index].image)

                .next()   // this is or the texts

                .children().first() //  first text
                .should('be.visible')
                .and('have.text', shoppingcartItems[index].program)

                .next()  // 2nd text 
                .should('be.visible')
                .and('have.text', shoppingcartItems[index].provider)

                .next() // 3rd text
                .should('be.visible')
                .and('have.text', '$'.concat(shoppingcartItems[index].price)) // static data is already more than 0 

            cy.wrap(card).children().last()
                .should('be.visible')  //2nd part of the card

                .children().first().children()  // discount applies to first 2 items only
                .then(el => { index < 2 ? cy.wrap(el).should('have.attr', 'data-testid', 'discount') : null })
                .and('include.text', shoppingcartItems[index].discount)

                .parent().parent().children()
                .last()   // add to card button
                .and('include.text', 'Add to Cart')
                .and('be.enabled')
        })
    })

    /*
    [TC02] - Cart Section Validation
    1 * Navigate to https://techglobal-training.com/frontend/shopping-cart
    2 * Validate the heading is “Items Added to Cart”
    3 * Validate that the cart is empty by default
    4 * Validate that the total price is zero “$0” by default
    5 * Validate that there is a “Place Order” button is displayed, disabled, and has the text “Place Order”
    */
    it('[TC02] - Cart Section Validation', () => {
        locators.getSubHeadingCartItems().should('have.text', 'Items Added to Cart')
        locators.getItemsOnCart().should('not.exist')
        locators.getTextTotalPrice().should('include.text', '$0')
        locators.getButtonPlaceOrder().should('not.be.enabled')
    })

    /*
    [TC03] - Add a Course to the Cart and Validate
    1 * Navigate to https://techglobal-training.com/frontend/shopping-cart
    2 * Click on the “Add to Cart” button for one of the courses
    3 * Validate that the course is displayed in the cart with its image, name, and discount amount if available
    4 * Validate that the course price is added to the total price ''including'' the discount amount
    5 * Click on the “Place Order” button
    6 * Validate a success message is displayed with the text “Your order has been placed.”
    7 Validate that the cart is empty
    */
    it.only('[TC03] - Add a Course to the Cart and Validate', () => {
        locators.getButtonCourse1().click()   // adding first card/course to cart
        locators.getItemsOnCart().children()
            .first() // image for the item on cart 
            .should('have.attr', 'src', shoppingcartItems[0].image)
            .next().children().first().should('have.text', shoppingcartItems[0].program)
            .next().should('include.text', `(${shoppingcartItems[0].discount} % off)`)
            .and('include.text', `$${Number(shoppingcartItems[0].price) * (1 - shoppingcartItems[0].discount / 100)}`)

        locators.getTextTotalPrice().should('include.text',`$${Number(shoppingcartItems[0].price) * (1 - shoppingcartItems[0].discount / 100)}` )
        locators.getButtonPlaceOrder().click()
        locators.getContainerOderConfirmation().should('have.text', 'Your order has been placed.')
    })




})

