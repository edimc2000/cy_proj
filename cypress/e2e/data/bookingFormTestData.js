class testData {
    inputTypes = {
        attrRadio: ['radio', '[input="radio"]'],
        attrText: ['text', '[type="text"]'],
        tagSelect: ['select', 'select'],
    }


    radioButtons = {

        'One way': {
            inputType: this.inputTypes['attrRadio'][0],
            labelName: 'One way',
            assertChecked: 'be.checked',
            assertEnabled: 'be.enabled',
            assertVisibility: 'be.visible',
        },

        'Round trip': {
            inputType: this.inputTypes['attrRadio'][0],
            labelName: 'Round trip',
            assertChecked: 'not.be.checked',
            assertEnabled: 'be.enabled',
            assertVisibility: 'be.visible',
        },
    }

    divs = {
        'Trip type': {
            inputType: this.inputTypes['attrRadio'][0],
            labelName: 'Trip type',
            defaultValue: '',
            assertInputElement:{
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Cabin Class': {
            inputType: this.inputTypes.tagSelect,
            labelName: 'Cabin Class',
            defaultValue: 'Select cabin class...',
            assertInputElement:{
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        From: {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'From',
            defaultValue: 'Select state...',
            assertInputElement:{
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        To: {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'To',
            defaultValue: 'Select state...',
            assertInputElement:{
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        Depart: {
            inputType: this.inputTypes['attrText'],
            labelName: 'Depart',
            defaultValue: '',
            assertInputElement:{
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        Return: {
            inputType: this.inputTypes['attrText'],
            labelName: 'Return',
            defaultValue: '',
            assertInputElement:{
                assertEnabled: 'not.be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Number of passengers': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Number of passengers',
            defaultValue: '1',
            assertInputElement:{
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Passenger 1': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)',
            assertInputElement:{
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Passenger 2': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)',
            assertInputElement:{
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Passenger 3': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)',
            assertInputElement:{
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Passenger 4': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)',
            assertInputElement:{
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Passenger 5': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)',
            assertInputElement:{
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Passenger 6': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)',
            assertInputElement:{
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Passenger 7': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)',
            assertInputElement:{
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Passenger 8': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)',
            assertInputElement:{
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Passenger 9': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)',
            assertInputElement:{
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },
    }

    mainLabelException = 'Trip type'

}


module.exports = new testData()


