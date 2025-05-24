/// <reference types = "cypress" />
const neatCSV = require('neat-csv')
import 'cypress-plugin-steps'
import 'cypress-real-events'
import '../pages/06-toDoListPage'
import toDoListPage from '../pages/06-toDoListPage'


describe('TG To do List', () => {
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

    /* 
    [TC01] Todo-App Modal Verification
    1 * Navigate to https://techglobal-training.com/frontend/todo-list.
    2 * Confirm that the todo-app modal is visible with the title “My Tasks.”
    3 * Validate that the New todo input field is enabled for text entry.
    4 * Validate ADD button is enabled.
    5 * Validate Search field is enabled.
    6 * Validate that the task list is empty, displaying the message “No tasks found!”
    */
    it('[TC01] Todo-App Modal Verification', () => {
        cy.section('-------------------')
        locators.getTextModalTitle().should('have.text', 'My Tasks')
        locators.getFieldAddToDo().should('be.enabled')
        locators.getButtonAdd().should('be.enabled')
        locators.getFieldSearch().should('be.enabled')
        toDoListPage.validateTaskListEmpty()
    })

    /* 
    [TC02]  Single Task Addition and Removal
    1 * Navigate to https://techglobal-training.com/frontend/todo-list
    2 * Enter a new task in the todo input field and add it to the list.
    3 * Validate that the new task appears in the task list.
    4 * Validate that the number of tasks in the list is exactly one.
    5 * Mark the task as completed by clicking on it.
    6 * Validate item is marked as completed.
    7 * Click on the button to remove the item you have added.
    8 * Remove the completed task by clicking the designated removal button.
    9 * Validate that the task list is empty, displaying the message “No tasks found!”.
    */
    it('[TC02] Single Task Addition and Removal', () => {
        toDoListPage.createTask(tableTestDataToDo[0].toDo)
        toDoListPage.validateTask(tableTestDataToDo[0].toDo)
        toDoListPage.validateTaskListLength(1)
        toDoListPage.markToDoAsDone(0)
        toDoListPage.deleteCompleted()
        toDoListPage.createTask(tableTestDataToDo[1].toDo)
        toDoListPage.deleteToDo(1)
        toDoListPage.validateTaskListEmpty()
    })

    /* [TC03] Multiple Task Operations
    1 * Navigate to https://techglobal-training.com/frontend/todo-list
    2 * Enter and add 5 to-do items individually.
    3 * Validate that all added items match the items displayed on the list.
    4 * Mark all the tasks as completed by clicking on them.
    5 * Click on the “Remove completed tasks!” button to clear them.
    6 * Validate that the task list is empty, displaying the message “No tasks found!”.
    */
    it('[TC03] Multiple Task Operations', () => {
        cy.section('-------------------')
        tableTestDataToDo.forEach(toDo => {
            toDoListPage.createTask(toDo.toDo)
            toDoListPage.validateTask(toDo.toDo)
        })

        tableTestDataToDo.forEach((toDo, i) => {
            toDoListPage.markToDoAsDone(i)
        })

        toDoListPage.deleteCompleted()
        toDoListPage.validateTaskListEmpty()
    })


    /* [TC04] Search and Filter Functionality in todo App
    1 * Navigate to https://techglobal-training.com/frontend/todo-list
    2 * Enter and add 5 to-do items individually.
    3 * Validate that all added items match the items displayed on the list.
    4 * Enter the complete name of the previously added to-do item into the search bar.
    5 * Validate that the list is now filtered to show only the item you searched for.
    6 * Validate that the number of tasks visible in the list is exactly one.
    */
    it('[TC04] Search and Filter Functionality in todo App', () => {
        cy.section('-------------------')
        tableTestDataToDo.forEach(toDo => {
            toDoListPage.createTask(toDo.toDo)
            toDoListPage.validateTask(toDo.toDo)
            toDoListPage.searchTask(toDo.toDo)
            toDoListPage.validateTaskListLength(1)
            toDoListPage.searchTaskClearField()
        })
    })

    /* [TC05] Task Validation and Error Handling
    1 * Navigate to https://techglobal-training.com/frontend/todo-list
    2 * Attempt to add an empty task to the to-do list.
    3 * Validate that the task list is empty, displaying the message “No task found!”.
    4 * Enter an item name exceeding 30 characters into the list.
    5 * Validate error message appears and says “Error: Todo cannot be more than 30 characters!”.
    6 * Add a valid item name to the list.
    7 * Validate that the active task count is exactly one.
    8 * Try to enter an item with the same name already present on the list.
    9 * Validate that an error message is displayed, indicating “Error: You already have {ITEM} in your todo list.”.
    */
   
    it('[TC05] Task Validation and Error Handling', () => {
        cy.section('-------------------')
        toDoListPage.clickAddButton()
        toDoListPage.validateTaskListEmpty()

        toDoListPage.createTask('Lorem ipsum dolor sit amet eros.')
        locators.getErrorContainer().should('have.text', 'Error: Todo cannot be more than 30 characters!')

        toDoListPage.createTask(tableTestDataToDo[0].toDo)
        toDoListPage.validateTaskListLength(1)

        toDoListPage.createTask(tableTestDataToDo[0].toDo)
        locators.getErrorContainer().should('have.text', `Error: You already have ${tableTestDataToDo[0].toDo} in your todo list.`)
    })
})

