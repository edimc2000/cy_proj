class testData {
    inputTypes = {
        attrRadio: ['radio', '[input="radio"]'],
        attrText: ['text', '[input="text"]'],
        tagSelect: ['select', 'select'],
    }


    divRadioButtons = {

        'One Way': {
            inputType: this.inputTypes['attrRadio'][0],
            labelName: 'One Way',
            checked: true,
        },

        'Round trip': {
            inputType: this.inputTypes['attrRadio'][0],
            labelName: 'Round trip',
            checked: false,
        },
    }

    divs = {
        'Trip type': {
            inputType: this.inputTypes['attrRadio'][0],
            labelName: 'Trip type',
            defaultValue: ''
        },

        'Cabin Class': {
            inputType: this.inputTypes.tagSelect,
            labelName: 'Cabin Class',
            defaultValue: 'Select cabin class...'
        },

        From: {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'From',
            defaultValue: 'Select state...'
        },

        To: {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'To',
            defaultValue: 'Select state...'
        },

        Depart: {
            inputType: this.inputTypes['attrText'],
            labelName: 'Depart',
            defaultValue: ''
        },

        Return: {
            inputType: this.inputTypes['attrText'],
            labelName: 'Return',
            defaultValue: ''
        },

        'Number of passengers': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Number of passengers',
            defaultValue: '1'
        },

        'Passenger 1': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)'
        },

        'Passenger 2': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)'
        },

        'Passenger 3': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)'
        },

        'Passenger 4': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)'
        },

        'Passenger 5': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)'
        },

        'Passenger 6': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)'
        },

        'Passenger 7': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)'
        },

        'Passenger 8': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)'
        },

        'Passenger 9': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)'
        },
    }

    mainLabelException = 'Trip type'

}


module.exports = new testData()


