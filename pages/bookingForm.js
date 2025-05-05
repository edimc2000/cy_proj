class Booking {
    elements = {

        radioButtonOneWay: () => cy.get('input[type="radio"][value="One way"]'),
        radioButtonRoundTrip: () => cy.get('input[type="radio"][value="Round trip"]'),
        selectCabinClass: () => cy.get(':nth-child(2) > div.select').children(),
        selectFrom: () => cy.get(':nth-child(3) > div.select').children(),
        selectTo: () => cy.get(':nth-child(4) > div.select').children(),

        labelOneWay: () => cy.get(''),
        labelTwoWay: () => cy.get(''),
        labelCabinClass: () => cy.get(':nth-child(2) > label.label'),
        labelFrom: () => cy.get(':nth-child(3) > label.label'),
        labelTo: () => cy.get(':nth-child(4) > label.label'),


        // select div.select

        labelPassengerCount: () => cy.get(':nth-child(7) > div.select select'),
        labelPassengerX: () => cy.get(':nth-child(n+8) > label.label'),
        errorMessage: () => cy.get('.notification.is-danger')


    }

    validateLogin() {

    }

}

module.exports = new Booking();