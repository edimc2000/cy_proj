// POM based
/// <reference types = "cypress" />
import Booking from "../../pages/booking";

describe('TG Booking Form', () => {

    beforeEach(() => {
        cy.visit('https://www.techglobal-training.com/frontend/booking');
    })

    it('check passegers', () => {
        Booking.elements.labelPassengerCount().select(6)
        Booking.elements.labelPassengerX()
       
    })



})