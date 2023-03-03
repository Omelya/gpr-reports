import * as yup from "yup";

export default (coordinate) => {
    return yup.object({
        [coordinate]: yup
            .number()
            .typeError('Must be number')
            .min(0, 'Must be min number 0')
            .max(180, 'Must be max number 180')
            .required('Must be required'),
    });
}