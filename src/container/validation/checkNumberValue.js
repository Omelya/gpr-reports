export default function checkNumberValue (e) {
    e.currentTarget.value = e.currentTarget.value.replace( /[^0-9]/, '');
}
