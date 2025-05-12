class TestData {
    headingText = 'Pagination'
    subHeadingText = 'World City Populations 2022'
    contentText = 'What are the most populated cities in the world? Here is a list of the top five most populated cities in the world:'

    buttonPreviosText = 'Previous < '
    buttonNextText = '> Next '

    paginatedContent = [
        {
            city: 'Tokyo',
            country: 'Japan',
            population: '37,435,191',
            image: '/images/pagination/tokyo.jpeg',

        },
        {
            city: 'Delhi',
            country: 'India',
            population: '29,399,141',
            image: '/images/pagination/delhi.jpeg',
        },
        {
            city: 'Shanghai',
            country: 'China',
            population: '26,317,104',
            image: '/images/pagination/shanghai.jpeg',
        },
        {
            city: 'Sao Paulo',
            country: 'Brasil',
            population: '21,846,507',
            image: '/images/pagination/saopaulo.jpeg',
        },
        {
            city: 'Mexico City',
            country: 'Mexico',
            population: '21,671,908',
            image: '/images/pagination/mexico.jpeg',
        }


    ]




}

module.exports = new TestData()