export default function checkFormData (formData) {
    let error = false;

    for (const [key, value] of formData.entries()) {

        if (value === '') {
            error = true;

            let element = document.getElementsByName(key);

            element[0].classList.remove('border-2');
            element[0].classList.remove('border-red-700');
            element[0].classList.add('border-red-700');
            element[0].classList.add('border-2');
        }
    }

    return error;
}