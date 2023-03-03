import * as yup from "yup";

export default (
    name_ammunition,
    number_ammunition,
) => {
    return yup.object({
        [name_ammunition]: yup
            .string()
            .typeError('Must be a string')
            .required('Must be required'),
        [number_ammunition]: yup
            .number()
            .typeError('Must be a number')
            .integer('Must be an integer')
            .min(1, 'Must be min number 1')
            .required('Must be required'),
    });
}
