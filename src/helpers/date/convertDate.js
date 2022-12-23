export default (date) => {
    let dateObject = new Date(date),
        day = '' + dateObject.getDate(),
        month = '' + (dateObject.getMonth() + 1),
        year = dateObject.getFullYear(),
        split;

    if (typeof date === 'string') {
        split = date.split(' ');
    } else {
        split = date;
    }

    if (month.length < 2) {
        month = '0' + month;
    }

    if (day.length < 2) {
        day = '0' + day;
    }

    if (split.length > 3) {
        let hour = String(dateObject.getHours()),
            minutes = String(dateObject.getMinutes());

        if (hour.length < 2) {
            hour = '0' + hour;
        }

        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }

        let time = [hour, minutes].join(':'),
            date = [year, month, day].join('-');

        return date + ' ' + time;
    }

    return [year, month, day].join('-');
}
