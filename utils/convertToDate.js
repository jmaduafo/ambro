import moment from 'moment';

export function timestampToDate(time) {
    const date = new Date(time * 1000)

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const fullDate = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()

    return fullDate
}

export function timeAgo(time) {
    const date = new Date(time * 1000)

    const dateTimeAgo = moment(date).fromNow();

    return dateTimeAgo
}