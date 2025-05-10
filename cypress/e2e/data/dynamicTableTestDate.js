class TestData {
    mainLabelException = 'Trip type'

    tableHeaders = ['Quantity', 'Product', 'Price $', 'Total $']
    tableName = 'Inventory'
    buttonLabel = 'ADD PRODUCT'
    totalAmountDefault = 'Total = $2,300'

    deafultContent = [
        {
            Quantity: 1,
            Product: 'iPhone',
            'Price $': '1,000',
            'Total $': '1,000'
        },
        {
            Quantity: 3,
            Product: 'Airpods',
            'Price $': '100',
            'Total $': '300'
        },
        {
            Quantity: 2,
            Product: 'iPad',
            'Price $': '500',
            'Total $': '1,000'
        }

    ]

}


module.exports = new TestData()


