import * as yup from "yup";

export default (type, number) => {
    return yup.object({
        [type]: yup
            .string()
            .typeError('Must be string')
            .required('Must be required'),
        [number]: yup
            .number()
            .typeError('Must be number')
            .integer('Must be integer')
            .positive('Must be positive number')
            .required('Must be required')
    });
}
