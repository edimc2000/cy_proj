class Booking {
    elements = {
        root: () => cy.get('#root'),
        buttonBook: () => cy.get('.control button'),
        divs: () => cy.get('div.field'),
        divLabels: () => cy.get('div.field').find('.label'),
        radioButtons: () => cy.get('label.radio'),
        radioRT: () => cy.get('[value="Round trip"]'),
        radioOW: () => cy.get('[value="One way"]'),

        selectCabinClass: () => cy.get(':nth-child(2) > div.select > select'),
        selectFrom: () => cy.get(':nth-child(3) > div.select > select'),
        selectTo: () => cy.get(':nth-child(4) > div.select > select'),
        inputDepart: () => cy.get(':nth-child(5) > div input', { timeout: 10000 }),
        inputReturn: () => cy.get(':nth-child(6) > div input'),
        selectNumPassengers: () => cy.get(':nth-child(7) > div.select > select'),
        
        divSummary: () => cy.get('div .ml-3 > div'),
        selectPassenger1: () => cy.get(':nth-child(8) > div.select > select'),
        selectPassenger2: () => cy.get(':nth-child(9) > div.select > select'),
        selectPassenger3: () => cy.get(':nth-child(10) > div.select > select'),
        selectPassenger4: () => cy.get(':nth-child(11) > div.select > select'),
        selectPassenger5: () => cy.get(':nth-child(12) > div.select > select'),
        selectPassenger6: () => cy.get(':nth-child(13) > div.select > select'),
        selectPassenger7: () => cy.get(':nth-child(14) > div.select > select'),
        selectPassenger8: () => cy.get(':nth-child(15) > div.select > select'),
        selectPassenger9: () => cy.get(':nth-child(16) > div.select > select'),
    
    datePickerContainer: () => cy.get('.react-datepicker__month-container'), 
    
    }

}

module.exports = new Booking();