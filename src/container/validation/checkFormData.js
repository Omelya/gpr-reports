export default function checkFormData (formData) {
    let error = false;

    for (const [key, value] of formData.entries()) {

        if (value === '') {
            error = true;

            let element = document.getElementsByName(key);

            if (element.length < 2) {
                addBorder(element, 0)
            } else {
                for (let n = 0; n < element.length; n++) {
                    addBorder(element, n)
                }
            }

        }
    }

    return error;
}

function addBorder(element, n) {
    if (element[n].value === '' || element[n].value === undefined) {
        element[n].classList.remove('border-2');
        element[n].classList.remove('border-red-700');
        element[n].classList.add('border-red-700');
        element[n].classList.add('border-2');
    }
}