class Booking {
    elements = {
        buttonBook: () => cy.get('.control button'),
        divDatePicker: () => cy.get('div.react-datepicker'),

        divs: () => cy.get('div.field'),
        divLabels: () => cy.get('div.field').find('.label'),
        radioButtons:  () => cy.get('label.radio'), 

        inputDepart: () => cy.get(':nth-child(5) > div input'),
        inputreturn: () => cy.get(':nth-child(6) > div input'),

        labels2to8: () => cy.get(':nth-child(n+2):nth-child(-n+16)> label.label'),
        labels1to2: () => cy.get(':nth-child(n+1):nth-child(-n+3)> label.label'),



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