export const passwordConfirmationCheck = (type, confirmType, password) => {
    const passwordConfirmation = document.getElementById(confirmType).value;

    if (passwordConfirmation.length === 0) return;

    if (password !== passwordConfirmation) {
        document.getElementById(type).classList.add('border-red-700');
        document.getElementById(type).classList.add('border-2');
        document.getElementById(confirmType).classList.add('border-red-700');
        document.getElementById(confirmType).classList.add('border-2');
    } else {
        document.getElementById(type).classList.remove('border-red-700');
        document.getElementById(type).classList.remove('border-2');
        document.getElementById(confirmType).classList.remove('border-red-700');
        document.getElementById(confirmType).classList.remove('border-2');
    }
}
