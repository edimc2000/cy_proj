class Pagination {
    elements = {
        heading: () => cy.get('.mb-5 h1'),
        subheading: () => cy.get('#sub_heading'), 
        content: () => cy.get('#content'),
      
    }


}

module.exports = new Pagination()