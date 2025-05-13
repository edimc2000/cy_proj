class BookingPage {
    selectors = {
        getRoot: () => cy.get('#getRoot'),
        getButtonBook: () => cy.get('.control button'),
        getDivs: () => cy.get('div.field'),
        getDivLabels: () => cy.get('div.field').find('.label'),
        getDivLabelsExceptTripType: () => cy.get('div.field:nth-child(n + 2)'),
       
        getRadioButtons: () => cy.get('label.radio'),
        getRadioRountrip: () => cy.get('[value="Round trip"]'),
        getRadioOneWay: () => cy.get('[value="One way"]'),

        getSelectCabinClass: () => cy.get(':nth-child(2) > div.select > select'),
        getSelectFrom: () => cy.get(':nth-child(3) > div.select > select'),
        getSelectTo: () => cy.get(':nth-child(4) > div.select > select'),
        getInputDepart: () => cy.get(':nth-child(5) > div input', { timeout: 10000 }),
        getInputReturn: () => cy.get(':nth-child(6) > div input'),


        getDatePickerButtonNext: () =>cy.get('[aria-label="Next Month"]'), 
        getInputDepartField: ':nth-child(5) > div input',
        getInputReturnField: ':nth-child(6) > div input',


        getSelectNumPassengers: () => cy.get(':nth-child(7) > div.select > select'),

        getDivSummary: () => cy.get('div .ml-3 > div'),
        getSelectPassenger1: () => cy.get(':nth-child(8) > div.select > select'),
        getSelectPassenger2: () => cy.get(':nth-child(9) > div.select > select'),
        getSelectPassenger3: () => cy.get(':nth-child(10) > div.select > select'),
        getSelectPassenger4: () => cy.get(':nth-child(11) > div.select > select'),
        getSelectPassenger5: () => cy.get(':nth-child(12) > div.select > select'),
        getSelectPassenger6: () => cy.get(':nth-child(13) > div.select > select'),
        getSelectPassenger7: () => cy.get(':nth-child(14) > div.select > select'),
        getSelectPassenger8: () => cy.get(':nth-child(15) > div.select > select'),
        getSelectPassenger9: () => cy.get(':nth-child(16) > div.select > select'),

        getDatePickerContainer: () => cy.get('.react-datepicker__month-container'),

    }

}

module.exports = BookingPage