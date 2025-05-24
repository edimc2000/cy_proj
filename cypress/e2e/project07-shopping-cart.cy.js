/// <reference types = "cypress" />
const neatCSV = require('neat-csv')
import 'cypress-plugin-steps'
import 'cypress-real-events'
import '../pages/06-toDoListPage'
import toDoListPage from '../pages/06-toDoListPage'


describe('TG Shopping Cart', () => {
    const locators = toDoListPage.locators
    let tableTestDataToDo

    before(() => {
        cy.fixture('06-toDoListPageSampleData').then(neatCSV).then(data => {
            tableTestDataToDo = data
            console.table(tableTestDataToDo)
        })
    })

    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/todo-list')
    })

   
})

