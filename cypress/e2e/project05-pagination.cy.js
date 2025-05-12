/// <reference types = "cypress" />
require('cypress-plugin-steps')
const pagination = require('../pages/paginationPage')
const testData = require('./data/paginationTestData')

const elements = pagination.elements

describe('TG Pagination Function', () => {

    beforeEach( () => {
        cy.visit('https://www.techglobal-training.com/frontend/pagination')

    })

it('[TC01] Validate the main content', () => {
    cy.section('Validate default texts on the page when loaded ')
    elements.heading().should('be.visible').and('have.text', testData.headingText)
    elements.subheading().should('be.visible').and('have.text', testData.subHeadingText)
    elements.content().should('be.visible').and('have.text', testData.contentText)

    
})




})