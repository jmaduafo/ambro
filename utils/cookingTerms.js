const measure = [
    'pound',
    'pounds',
    'clove',
    'cloves',
    'teaspoon',
    'teaspoons',
    'tablespoon',
    'tablespoons',
    'cup',
    'cups',
    'ounce',
    'ounces',
    'fluid ounce',
    'fluid ounces',
    'gallon',
    'gallons',
    'dollop',
    'dollops',
    'slice',
    'slices',
    'half',
    'halves',
    'teacup',
    'teacups',
    'gill',
    'gills',
    'dash',
    'dashes',
    'pint',
    'pints',
    'quart',
    'quarts',
    'pinch',
    'pinches',
    'liter',
    'liters',
    'drop',
    'drops',
]

export const measurement = []

measure.forEach((item, index) => {
    measurement.push({key: index, value: item})
})



export const courses = [
    {
        key: '1',
        value: "Hors d'ouevre"
    },
    {
        key: '2',
        value: "Soup"
    },
    {
        key: '3',
        value: "Appetizer"
    },
    {
        key: '4',
        value: "Salad"
    },
    {
        key: '5',
        value: "Main course"
    },
    {
        key: '6',
        value: "Dessert"
    },
]

export const difficulty = [
    {
        key: '1',
        value: 'Low'
    },
    {
        key: '2',
        value: 'Medium'
    },
    {
        key: '3',
        value: 'High'
    }
]

export const heat = [
    {
        key: '1',
        value: 0
    },
    {
        key: '2',
        value: 1
    },
    {
        key: '3',
        value: 2
    },
    {
        key: '4',
        value: 3
    }
]

export const calorieRanges = [
    {
        key: '1',
        value: '<100'
    },
    {
        key: '2',
        value: '100 - 520'
    },
    {
        key: '3',
        value: '521 - 900'
    },
    {
        key: '4',
        value: '901 - 1200'
    },
    {
        key: '5',
        value: '1201 - 900'
    },
    {
        key: '5',
        value: '1201 - 900'
    },
    {
        key: '5',
        value: '1201 - 900'
    },
    {
        key: '5',
        value: '1201 - 900'
    },
    {
        key: '5',
        value: '1201 - 900'
    },
]