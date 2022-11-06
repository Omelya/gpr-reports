export default function checkFloatNumberValue (e) {
    e.currentTarget.value = e.currentTarget.value.replace(/[a-zA-Z]+/, '');
    e.currentTarget.value = e.currentTarget.value.replace(/[,]+/, '');
    e.currentTarget.value = e.currentTarget.value.replace(/^0{2}/, '0');
    e.currentTarget.value = e.currentTarget.value.replace(/[.]{2}/, '.');
    e.currentTarget.value = e.currentTarget.value.replace(/(^[.])+/, '0.');
    e.currentTarget.value = e.currentTarget.value.replace(/([.]([0-9]*)[.])+/, '');
}
