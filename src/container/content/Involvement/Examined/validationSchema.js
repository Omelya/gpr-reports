import * as yup from "yup";

export default (examined) => {
    return yup.object({
        [examined]: yup
            .number()
            .typeError('Must be number')
            .min(0, 'Must be min number 0')
            .required('Must be required'),
    });
}