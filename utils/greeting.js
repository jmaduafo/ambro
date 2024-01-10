export const greeting = () => {
    const date = new Date()

    let greet;

    if (date.getHours() >= 0 && date.getHours() < 12 ) {
        greet = 'morning'
    } else if (date.getHours() >= 12 && date.getHours() < 17 ) {
        greet = 'afternoon'
    } else if (date.getHours() >= 17 && date.getHours() <= 23) {
        greet = 'evening'
    }

    return greet
}