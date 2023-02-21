const {PlaceType} = require('../models/placeType')

const types =[
    {
        typeName: 'Building'
    },
    {
        typeName: 'Business'
    },
    {
        typeName: 'Outdoor Space'
    },
    {
        typeName: 'Cultural Site'
    },
    {
        typeName: 'Other'
    },

]

const seedDatabase = async () => {
    await PlaceType.bulkCreate(types)
}

module.exports = {
    seedDatabase
}