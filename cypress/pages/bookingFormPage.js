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
        inputDepart: () => cy.get(':nth-child(5) > div input'),
        inputreturn: () => cy.get(':nth-child(6) > div input'),
        selectNumPassengers: () => cy.get(':nth-child(7) > div.select > select'),
        selectPassenger1: () => cy.get(':nth-child(8) > div.select > select'),
        divSummary: () => cy.get('div .ml-3'),
        // debugging selectors 


        inputreturn: () => cy.get(':nth-child(6) > div input'),

        labels2to8: () => cy.get(':nth-child(n+2):nth-child(-n+16)> label.label'),
        labels1to2: () => cy.get(':nth-child(n+1):nth-child(-n+3)> label.label'),






       
        selectPassenger1: () => cy.get(':nth-child(8) > div.select').children(),


        //// some test selectors to be removed later
        //************************************************** */
        labelPassengerCount: () => cy.get(':nth-child(7) > div.select select'),
        labelPassengerX: () => cy.get(':nth-child(n+8) > label.label'),
        errorMessage: () => cy.get('.notification.is-danger')
        //************************************************** */


    }



}

module.exports = new Booking();