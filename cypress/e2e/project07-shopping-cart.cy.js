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
                .then( el => {index < 2 ? cy.wrap(el ).should('have.attr', 'data-testid', 'discount'): null})
                .and('include.text', shoppingcartItems[index].discount)
                               
                .parent().parent().children()
                .last()   // add to card button
                .and('include.text', 'Add to Cart')
                .and('be.enabled')
        })

    })


})

