import * as yup from "yup";

export default (
    act_type,
    act_number,
    report_type,
    report_number,
    place_execution,
    coordinates_north,
    coordinates_east,
    examined,
    tnt,
    detonator,
    person,
    name_ammunition,
    all_ammunition,
) => {
    return yup.object({
        [act_type]: yup
            .string()
            .typeError('Must be number')
            .length(1)
            .required('Must be required'),
        [act_number]: yup
            .number()
            .typeError('Must be number')
            .min(1, 'Must be min number 1')
            .required('Must be required'),
        [report_type]: yup
            .string()
            .typeError('Must be number')
            .min(1, 'Must be min number 1')
            .required('Must be required'),
        [report_number]: yup
            .number()
            .typeError('Must be number')
            .min(1, 'Must be min number 1')
            .required('Must be required'),
        [place_execution]: yup
            .string()
            .typeError('Must be number')
            .min(1, 'Must be min number 1')
            .required('Must be required'),
        [coordinates_north]: yup
            .number()
            .typeError('Must be number')
            .min(1, 'Must be min number 1')
            .required('Must be required'),
        [coordinates_east]: yup
            .number()
            .typeError('Must be number')
            .min(1, 'Must be min number 1')
            .required('Must be required'),
        [examined]: yup
            .number()
            .typeError('Must be number')
            .min(1, 'Must be min number 1')
            .required('Must be required'),
        [tnt]: yup
            .number()
            .typeError('Must be number')
            .min(1, 'Must be min number 1')
            .required('Must be required'),
        [detonator]: yup
            .number()
            .typeError('Must be number')
            .min(1, 'Must be min number 1')
            .required('Must be required'),
        [person]: yup
            .string()
            .typeError('Must be number')
            .min(1, 'Must be min number 1')
            .required('Must be required'),
        [name_ammunition]: yup
            .string()
            .typeError('Must be number')
            .min(1, 'Must be min number 1')
            .required('Must be required'),
        [all_ammunition]: yup
            .number()
            .typeError('Must be number')
            .min(1, 'Must be min number 1')
            .required('Must be required'),
    });
}
