import { categories } from "./popularCategories"

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
        value: "Hors D'ouevre"
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
        value: "Main Course"
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
        value: '0'
    },
    {
        key: '2',
        value: '1'
    },
    {
        key: '3',
        value: '2'
    },
    {
        key: '4',
        value: '3'
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

// export const pictures = [
//     6470,
//     6474,
//     6478,
//     6483,
//     6524,
//     6528,
//     6548,
//     6549,
//     6561,
//     6562,
//     6569,
//     6602,
//     6606,
//     6610,
//     6612,
//     6617, 
//     6618,
//     6630,
//     6627,
//     6631,
//     6634,
//     6645,
//     6647,
//     6661,
//     6651,
//     6666,
//     6671,
//     6686,
//     6691,
//     6710,
//     6712,
//     6726,
//     6718,
//     6748,
//     6769,
//     6784,
//     6782,
//     6797,
//     6790,
//     6806,
//     6808,
//     6811,
//     6809,
//     6817,
//     6829,
//     6836,
//     6848,
//     6837,
//     6867,
//     6852,
//     6885,
//     6886,
//     6898,
//     6889,
//     6906,
//     6910,
//     6911,
//     6915,
//     6930,
//     6925,
//     6942,
//     6936,
//     6969,
//     7591, // First to go
//     7626,
//     7617,
//     7669,
//     7674,
//     7690,
//     7705,
//     7738,
//     7723,
//     7779,
//     7784,
//     7789,
//     7797,
//     7795,
//     7801,
//     7819,
//     7814,
//     7821,
//     7825,
//     7837,
//     7850,
//     7849,
//     7856,
//     7888,
//     7876,
//     7896,
//     7903,
//     7909,
//     7913,
//     7917,
//     7928,
//     7929,
//     7930,
//     7943,
//     7942,
//     7949,
//     7969,
//     7971,
//     7975,
//     7985,
//     7991,
//     8001,
//     8012,
//     8013,
//     8020,
//     8017,
//     8016,
//     8033,
//     8025,
//     8032,
//     8054,
//     8068,
//     8074,
//     8071,
//     8091,
//     8086,
//     8099,
//     8107,
//     8125,
//     8117,
//     8114,
//     8130,
//     8152,
//     8147,
//     8157,
//     8453,
//     8176,
//     8183,
//     8220,
//     8208,
//     8240,
//     8241,
//     8248,
//     8253,
//     8260,
//     8285,
//     8302,
//     8333,
//     8345,
//     8385,
//     8409,
//     8415,
//     8426,
//     8447,
//     8494,
//     8485,
//     8621
// ]

// let left = 15

export const tagsOptions = []

categories.forEach((categories, index) => {
    tagsOptions.push({key: index, value: categories.strCategory})
})