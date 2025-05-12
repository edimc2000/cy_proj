class Pagination {
    elements = {
        heading: () => cy.get('.mb-5 h1'),
        subheading: () => cy.get('#sub_heading'),
        content: () => cy.get('#content'),

        buttonPrevious: () => cy.get('#previous'),
        buttonNext: () => cy.get('#next'),

        pageMarkers: () => cy.get('p.circle'),

        contentCity: () => cy.get('p.city_info'),
        contentCountry: () => cy.get('p.country_info'),
        contentPopulation: () => cy.get('p.population_info'),
        contentImage: () => cy.get('img.city_image')

    }


}

module.exports = new Pagination()