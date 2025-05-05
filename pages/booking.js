class Booking {
    elements = {
        validUserName: 'TechGlobal',


        labelCabinClass: '', 
        labelLeavingFrom: '', 
        labelGoingTo: '',
        labelDateDepart: '',
        labelDateReturn: '',
        labelPassengerCount: () => cy.get(':nth-child(7) > div.select select'),
        labelPassengerX: () => cy.get(':nth-child(n+8)> label.label'),
  

        errorMessage: () =>cy.get('.notification.is-danger') 


    }

    validateLogin() {
        
    }

}

module.exports = new Booking();