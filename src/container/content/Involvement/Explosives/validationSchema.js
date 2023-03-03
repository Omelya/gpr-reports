import * as yup from "yup";

export default (value) => {
    let rule = yup
        .number()
        .typeError('Must be number')
        .min(0, 'Must be min number 0')
        .required('Must be required');

    if (value[0] === 'detonator') {
       rule = rule.integer('Must be integer')
    }

    return yup.object({
        [value]: rule
    });
}
