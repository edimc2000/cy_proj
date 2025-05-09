class TestData {
    mainLabelException = 'Trip type'

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

    radioButtonsRT = {
        'One way': {
            inputType: this.inputTypes['attrRadio'][0],
            labelName: 'One way',
            assertChecked: 'not.be.checked',
            assertEnabled: 'be.enabled',
            assertVisibility: 'be.visible',
        },

        'Round trip': {
            inputType: this.inputTypes['attrRadio'][0],
            labelName: 'Round trip',
            assertChecked: 'be.checked',
            assertEnabled: 'be.enabled',
            assertVisibility: 'be.visible',
        },
    }

    divs = {
        'Trip type': {
            inputType: this.inputTypes['attrRadio'][0],
            labelName: 'Trip type',
            defaultValue: '',
            assertInputElement: {
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Cabin Class': {
            inputType: this.inputTypes.tagSelect,
            labelName: 'Cabin Class',
            defaultValue: 'Select cabin class...',
            assertInputElement: {
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        From: {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'From',
            defaultValue: 'Select state...',
            assertInputElement: {
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        To: {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'To',
            defaultValue: 'Select state...',
            assertInputElement: {
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        Depart: {
            inputType: this.inputTypes['attrText'],
            labelName: 'Depart',
            defaultValue: '',
            assertInputElement: {
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        Return: {
            inputType: this.inputTypes['attrText'],
            labelName: 'Return',
            defaultValue: '',
            assertInputElement: {
                assertEnabled: 'not.be.enabled',
                assertEnabledRT: 'be.enabled',
                assertVisibility: 'be.visible',

            }
        },

        'Number of passengers': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Number of passengers',
            defaultValue: '1',
            assertInputElement: {
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Passenger 1': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)',
            assertInputElement: {
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Passenger 2': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Child (2-11)',
            assertInputElement: {
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Passenger 3': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)',
            assertInputElement: {
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Passenger 4': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)',
            assertInputElement: {
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Passenger 5': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)',
            assertInputElement: {
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Passenger 6': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)',
            assertInputElement: {
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Passenger 7': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)',
            assertInputElement: {
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Passenger 8': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)',
            assertInputElement: {
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },

        'Passenger 9': {
            inputType: this.inputTypes['tagSelect'],
            labelName: 'Passenger 1',
            defaultValue: 'Adult (16-64)',
            assertInputElement: {
                assertEnabled: 'be.enabled',
                assertVisibility: 'be.visible',
            }
        },
    }

    testDates = () => {
        /*
         checks date now 05/08/2025 and output date after 7 days and 30 days later 
         example {dDate: '05/15/2025', rDate: '06/15/2025'} 
        */

        const nextWeek = new Date()
        nextWeek.setDate(nextWeek.getDate() + 7)
        const nextMonth = new Date()
        nextMonth.setDate(nextMonth.getDate() + 30)

        const fourWeeks = (nextMonth.getMonth() + 1).toString().padStart(2, '0')
        const month = (nextWeek.getMonth() + 1).toString().padStart(2, '0')
        const day = nextWeek.getDate().toString().padStart(2, '0')
        const year = nextWeek.getFullYear().toString()//.slice(-2)

        const tripDate = {
            dDate: `${month}/${day}/${year}`,
            rDate: `${fourWeeks}/${day}/${year}`
        }

        return tripDate

    }


}


module.exports = new TestData()


