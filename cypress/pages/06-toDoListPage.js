class ToDoListPage {

    locators = {
        getTextPageHeader: () => cy.get('h1.is-size-3'),
        getTextModalTitle: () => cy.get('.panel-heading.has-text-white'),
        getButtonAdd: () => cy.get('#add-btn'),
        getFieldAddToDo: () => cy.get('#input-add'),
        getFieldSearch: () => cy.get('#search'),
        getTextMessageContainer: () => cy.get('.ml-1'),
        getPanelToDosContainer: () => cy.get('#panel'),
        getPanelToDosList: () => cy.get('.panel-block.todo-item'),

        // getPanelToDoMarkNotDone: () => cy.get('.panel-icon:not([class*="panel-icon has-text"])'),
        getPanelToDoMarkNotDone: () => cy.get('.panel-icon:nth-child(odd)'),
        getPanelToDoDelete: () => cy.get('.destroy'),
        getRemoveCompleted: () => cy.get('#clear'), 
        getErrorContainer: () => cy.get('.notification.is-danger')
    }

    // Methods - single actions
    inputTaskToField = (task) => this.locators.getFieldAddToDo().clear().type(task)
    clickAddButton = () => this.locators.getButtonAdd().click()

    // Methods - work flow
    createTask = task => {
        this.inputTaskToField(task)
        this.clickAddButton()
    }

    validateTask = task => {
        this.locators.getPanelToDosList().last().should('have.text', task)
    }

    validateTaskListLength = (length) => {
        this.locators.getPanelToDosList().should('have.length', length)
    }


    validateTaskListEmpty = () => {
        this.locators.getTextMessageContainer().should('have.text', 'No tasks found!')
    }

    /**
     * @param {number} row row 1 should be entered as 0
     */
    markToDoAsDone = row => {
        this.locators.getPanelToDoMarkNotDone().each((el, index) => {
            if (row === index) {
                cy.wrap(el).click()
                cy.wrap(el).should('have.attr', 'class').and('include', 'has-text-success')
            }
        })
    }

    deleteToDo = row => {
        this.locators.getPanelToDoDelete().each((el, index) => {
            index + 1 === row ? cy.wrap(el).click() : null
        })
    }

    deleteCompleted = () => {
        this.locators.getRemoveCompleted().click()
    }

    searchTask = task => {
        this.locators.getFieldSearch().clear().type(task)
        this.validateTask(task)

    }

    searchTaskClearField = () => {
        this.locators.getFieldSearch().clear()
    }

    
}

export default new ToDoListPage()