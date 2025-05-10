class DynamicTable {
    elements = {
        heading: () => cy.get('h1.is-size-3'),
        tableHeaders: () => cy.get('#product_table thead tr th'),
        tableBody: () => cy.get('#product_table tbody tr'),
        buttonAddProduct: () => cy.get('#add_product_btn'),
        totalAmount: () => cy.get('#total_amount'),
    }

}

module.exports = new DynamicTable();