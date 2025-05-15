/// <reference types = "cypress" />
require('cypress-plugin-steps')
require('cypress-real-events')

const pagination = require('../pages/paginationPage')
const testData = require('./data/paginationTestData')

const elements = pagination.elements

describe('TG Pagination Function', () => {

    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/pagination')

    })

    
    it('[TC01] Validate the main content', () => {
        cy.section('Validate default texts on the page when loaded ')
        elements.heading().should('be.visible').and('have.text', testData.headingText)
        elements.subheading().should('be.visible').and('have.text', testData.subHeadingText)
        elements.content().should('be.visible').and('have.text', testData.contentText)
    })

    it('[TC02] Validate the Pagination Next/Previous buttons', () => {
        cy.section('Validate the buttons ')

        cy.step('Validate - Previous button default state')
        elements.buttonPrevious()
            .should('be.visible')
            .and('not.be.enabled')
            .children().eq(0)
            .and('have.text', testData.buttonPreviosText)

        cy.step('Validate - Next button default state')
        elements.buttonNext()
            .should('be.visible')
            .and('be.enabled')
            .children().eq(0)
            .and('have.text', testData.buttonNextText)

        cy.step('Validate - Previous button after clicking next')
        elements.buttonNext().realClick()
        elements.buttonPrevious().should('be.enabled')

        cy.step('Validate - Click “Next” button till it becomes disabled')
        elements.pageMarkers().then(el => {
            elements.buttonNext().realClick({ clickCount: el.length - 1 })
        })
        elements.buttonPrevious().should('be.enabled')
        elements.buttonNext().should('not.be.enabled')

    })
    it('[TC03] Validate the Pagination Cities content', () => {

        cy.section('Validate - Paginated content')
        elements.pageMarkers().each((el, index) => {
            elements.contentCity().should('be.visible').and('have.text', `City: ${testData.paginatedContent[index].city}`)
            elements.contentCountry().should('be.visible').and('have.text', `Country: ${testData.paginatedContent[index].country}`)
            elements.contentPopulation().should('be.visible').and('have.text', `Population: ${testData.paginatedContent[index].population}`)
            elements.contentImage().should('be.visible').and('have.attr', 'src', testData.paginatedContent[index].image)

            elements.buttonNext().realClick()

        })






    })



})