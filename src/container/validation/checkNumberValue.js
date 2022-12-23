export const checkNumberValue = (e) => {
    e.currentTarget.value = e.currentTarget.value.replace( /[^0-9]/, '');
    e.currentTarget.classList.remove('border-red-700');
    e.currentTarget.classList.remove('border-2');

    if (e.currentTarget.value.length < 1) {
        e.currentTarget.classList.add('border-red-700');
        e.currentTarget.classList.add('border-2');
    }
}
