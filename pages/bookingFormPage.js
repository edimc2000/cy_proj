class Booking {
    elements = {
        buttonBook: () => cy.get('.control button'),
        divDatePicker: () => cy.get('div.react-datepicker'),

        inputDepart: () => cy.get(':nth-child(5) > div input'),
        inputreturn: () => cy.get(':nth-child(6) > div input'),

        labelOneWay: () => cy.get(''),
        labelTwoWay: () => cy.get(''),
        labelCabinClass: () => cy.get(':nth-child(2) > label.label'),
        labelFrom: () => cy.get(':nth-child(3) > label.label'),
        labelTo: () => cy.get(':nth-child(4) > label.label'),
        labelDepart: () => cy.get(':nth-child(5) > label.label'),
        labelReturn: () => cy.get(':nth-child(6) > label.label'),
        labelNumPassengers: () => cy.get(':nth-child(7) > label.label'),
        labelPassenger1: () => cy.get(':nth-child(8) > label.label'),
        labels2to8: () => cy.get(':nth-child(n+2):nth-child(-n+16)> label.label'),

        radioButtonOneWay: () => cy.get('input[type="radio"][value="One way"]'),
        radioButtonRoundTrip: () => cy.get('input[type="radio"][value="Round trip"]'),

        selectCabinClass: () => cy.get(':nth-child(2) > div.select').children(),
        selectFrom: () => cy.get(':nth-child(3) > div.select').children(),
        selectTo: () => cy.get(':nth-child(4) > div.select').children(),
        selectNumPassengers: () => cy.get(':nth-child(7) > div.select').children(),
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