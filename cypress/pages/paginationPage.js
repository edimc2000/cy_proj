class Pagination {
    elements = {
        heading: () => cy.get('.mb-5 h1'),
        subheading: () => cy.get('#sub_heading'), 
        content: () => cy.get('#content'),

        buttonPrevious: () => cy.get('#previous'),
        buttonNext: () => cy.get('#next'),
        
        pageMarkers: () => cy.get('p.circle'),
    }


}

module.exports = new Pagination()