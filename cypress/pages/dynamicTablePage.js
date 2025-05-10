class DynamicTable {
    elements = {
        heading: () => cy.get('h1.is-size-3'),
        tableHeaders: () => cy.get('#product_table thead tr th'),
        tableBody: () => cy.get('#product_table tbody tr'),
        buttonAddProduct: () => cy.get('#add_product_btn'),
        totalAmount: () => cy.get('#total_amount'),
             
        modalPopUp: () => cy.get('header.modal-card-head'),
        modalTitle: () => cy.get('#modal_title'),
        modalCloseButton: () => cy.get('[aria-label="close"]'), 

        modalInputLabels: () => cy.get('#name_form label'), 
        modalInputBoxes: () => cy.get('#name_form input'), 

        modalInputQuantity: () => cy.get('#quantity'),
        modalInputProduct: () => cy.get('#product'),
        modalInputPrice: () => cy.get('#price'),
        modalSubmitButton: () => cy.get('#submit'),




    }

}

module.exports = new DynamicTable();