/// <reference types = "cypress" />
require('cypress-plugin-steps')
const dynamicTable = require('../pages/dynamicTablePage')
const testData = require('./data/dynamicTableTestData')
const elements = dynamicTable.elements
const formatter = new Intl.NumberFormat('en-US')


describe('TG Dynamic Tables', () => {

    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/dynamic-tables')

    })

    it('[TC01] Validate the default content of the inventory table', () => {
        cy.section('Name and Headers')
        cy.step('Table Name')
        elements.heading().should('have.text', testData.tableName).and('be.visible')

        cy.step('Table Headers')
        elements.tableHeaders().each((el, index) => {
            cy.wrap(el).should('have.text', testData.tableHeaders[index]).and('be.visible')
        })

        cy.section('Dafault Table Content')
        elements.tableBody().each((tbody, index1) => {
            cy.step(`Validating Row ${index1 + 1} - values and visibility `)
            cy.wrap(tbody).children().each((content, index2) => {
                let productQuery
                index2 < 3 ? productQuery = testData.defaultContent[index1][testData.tableHeaders[index2]]
                    : productQuery = (testData.defaultContent[index1][testData.tableHeaders[index2 - 3]]
                        * (Number(testData.defaultContent[index1][testData.tableHeaders[index2 - 1]].replace(/,/g, '')))).toLocaleString('en-US')
                cy.wrap(content).should('have.text', productQuery).and('be.visible')
            })
        })
        cy.section('Others')
        cy.step('Add Product Button')
        elements.buttonAddProduct()
            .should('be.enabled')
            .and('be.visible')
            .and('have.text', testData.buttonAddProductLabel)

        cy.step('Total Amount')
        elements.totalAmount()
            .should('be.visible')
            .and('have.text', testData.totalAmountDefault)
    })

    it('[TC02] Validate the Add New Product modal', () => {
        elements.buttonAddProduct().click()

        cy.step('Validate modal title')
        elements.modalTitle()
            .should('be.visible')
            .and('have.text', testData.modalTitle)

        cy.step('Validate modal close button clickability and visibility')
        elements.modalCloseButton()
            .should('be.visible')
            .and('be.enabled')

        cy.step('Validate modal input labels string value and visibility')
        elements.modalInputLabels().each((el, index) => {
            cy.wrap(el)
                .should('have.text', testData.modalInputLabel[index])
                .and('be.visible')
        })

        cy.step('Validate modal input boxes clickability and visibility')
        elements.modalInputBoxes().each((el, index) => {
            cy.wrap(el)
                .should('be.enabled')
                .and('be.visible')
        })

        cy.step('Validate modal submit button')
        elements.modalSubmitButton()
            .should('have.text', testData.buttonSubmitLabel)
            .and('be.visible')
            .and('be.enabled')
    })

    it('[TC03] Validate the Add New Product modal X button', () => {
        elements.buttonAddProduct().click()
        cy.section('Validate Content of Modal')
        elements.modalTitle()
            .should('be.visible')
            .and('have.text', testData.modalTitle)

        elements.modalCloseButton().click()
        elements.modalTitle().should('not.exist')
    })
    it('[TC04] Validate the new product added', () => {
        let totalAmount = 0
        elements.buttonAddProduct().click()

        cy.step(`Input test values`)
        dynamicTable.addProduct(testData.addTestProduct[0]['Quantity'], testData.addTestProduct[0]['Product'], testData.addTestProduct[0]['Price $'])
        elements.modalSubmitButton().click()

        cy.step(`Validating Last Row - values and visibility `)
        elements.tableLastRowCells().each((lastRow, index) => {
            cy.wrap(lastRow).each((content) => {
                let productQuery
                index < 3 ? productQuery = testData.addTestProduct[0][testData.tableHeaders[index]]
                    : productQuery = (testData.addTestProduct[0][testData.tableHeaders[index - 3]]
                        * (Number(testData.addTestProduct[0][testData.tableHeaders[index - 1]].replace(/,/g, '')))).toLocaleString('en-US')
                cy.wrap(content).should('have.text', productQuery).and('be.visible')
            })
        })

        cy.step(`Validating Total - value and visibility `)
        elements.tableLastColumnCells().then((el) => {
            const numEl = el.length
            elements.tableLastColumnCells().each((content, index) => {
                totalAmount += Number(content.text().replace(/,/g, ''))
                if (index === numEl - 1) { return cy.wrap(`Total = $${totalAmount.toLocaleString('en-US')}`).as('storedValues') }
            })
        })
        cy.get('@storedValues').then((value) => {
            elements.totalAmount()
                .should('be.visible')
                .and('have.text', value)
        })
    })

})