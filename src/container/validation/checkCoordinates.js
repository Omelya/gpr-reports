export default function checkCoordinates (e) {
    if (Number(e.currentTarget.value) > 180) {
        e.currentTarget.value = 180
    }

    e.currentTarget.value = e.currentTarget.value.replace(/[a-zA-Z]+/, '');
    e.currentTarget.value = e.currentTarget.value.replace(/[-,]+/, '');
    e.currentTarget.value = e.currentTarget.value.replace(/^0/, '');
    e.currentTarget.value = e.currentTarget.value.replace(/^[0-9]{4}/, '');
    e.currentTarget.value = e.currentTarget.value.replace(/[.]{2}/, '.');
    e.currentTarget.value = e.currentTarget.value.replace(/(^[.])+/, '');
    e.currentTarget.value = e.currentTarget.value.replace(/([.]([0-9]*)[.])+/, '');
}