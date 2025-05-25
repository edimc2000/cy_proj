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
        let totalAmount = addToCart([shoppingcartItems[0]])
        locators.getTextTotalPrice().should('include.text', `$${totalAmount.reduce((cost, amount) => cost + amount, 0)}`)
        locators.getButtonPlaceOrder().click()
        locators.getContainerOderConfirmation().should('have.text', 'Your order has been placed.')
        locators.getItemsOnCart().should('not.exist')
    })

    /* 
    [TC04] - Add Two Courses to the Cart and Validate
    1 Navigate to https://techglobal-training.com/frontend/shopping-cart
    2 Click on the “Add to Cart” button for one of the courses
    3 Click on the “Add to Cart” button for another course
    4 Validate that the courses are displayed in the cart with their image, name, and discount amount if available
    5 Validate that the course prices are added to the total price ''including'' the discount amounts
    6 Click on the “Place Order” button
    7 Validate a success message is displayed with the text “Your order has been placed.”
    8 Validate that the cart is empty
    */

    it.only('[TC04] - Add Two Courses to the Cart and Validate', () => {
        let totalAmount = addToCart([shoppingcartItems[0], shoppingcartItems[1]])
        locators.getTextTotalPrice().should('include.text', `$${totalAmount.reduce((cost, amount) => cost + amount, 0)}`)
        locators.getButtonPlaceOrder().click()
        locators.getContainerOderConfirmation().should('have.text', 'Your order has been placed.')
        locators.getItemsOnCart().should('not.exist')
    })

    /*
    [TC05] Add All Three Courses to the Cart and Validate
    1 Navigate to https://techglobal-training.com/frontend/shopping-cart
    2 Click on the “Add to Cart” button for all three courses
    3 Validate that the courses are displayed in the cart with their image, name, and discount amount if available
    4 Validate that the course prices are added to the total price 'including' the discount amounts
    6 Click on the “Place Order” button
    7 Validate a success message is displayed with the text “Your order has been placed.”
    8 Validate that the cart is empty
    */

    it.only('[TC05] - Add All Three Courses to the Cart and Validate', () => {
        let totalAmount = addToCart(shoppingcartItems)
        locators.getTextTotalPrice().should('include.text', `$${totalAmount.reduce((cost, amount) => cost + amount, 0)}`)
        locators.getButtonPlaceOrder().click()
        locators.getContainerOderConfirmation().should('have.text', 'Your order has been placed.')
        locators.getItemsOnCart().should('not.exist')
    })



    const addToCart = arr => {
        let totalAmount = []
        
        arr.forEach((data, index) => {
            shoppingCartPage.addProgramToCart(data.program)
            let discount
            let programCost

            cy.log(`--------${data.program} ${index}`)
            if (index < 2) {
                discount = `(${data.discount} % off)`
                programCost = `${Number(shoppingcartItems[index].price) * (1 - shoppingcartItems[index].discount / 100)}`
            } else {
                discount = ``
                programCost = `${Number(shoppingcartItems[index].price)}`
            }

            locators.getItemsOnCart().eq(index).children()
                .eq(0) // image for the item on cart
                .should('have.attr', 'src', data.image)
                .parent().children()
                .eq(1)  //program description and price with discount 
                .children()
                .eq(0) //program name 
                .should('have.text', data.program)
                .parent().children()
                .eq(1) // price and discount
                .should('include.text', `${discount}`)
                .and('include.text', `$${programCost}`)

            totalAmount.push(Number(programCost))
            cy.log('====== program cost ', totalAmount.reduce((cost, amount) => cost + amount, 0))
        })

        return totalAmount
    }


})

