class TestData {
    mainLabelException = 'Trip type'

    tableHeaders = ['Quantity', 'Product', 'Price $', 'Total $']
    tableName = 'Inventory'
    buttonAddProductLabel = 'ADD PRODUCT'
    buttonSubmitLabel = 'SUBMIT'

    totalAmountDefault = 'Total = $2,300'

    modalTitle = 'Add New Product'
    modalInputLabel= ['Please select the quantity','Please enter the name of the product','Please enter the price of the product']
    
    defaultContent = [
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

    addTestProduct = [
        {
            Quantity: 2,
            Product: 'Mouse',
            'Price $': '100',
            'Total $': '200'
        },
      ]

}


module.exports = new TestData()


