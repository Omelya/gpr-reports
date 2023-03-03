import React from "react";
import {MenuItem, FormControl, Select, TextField, Typography} from "@mui/material";
import {useEffect} from "react";
import {useFormik} from "formik";
import validationSchema from "./validationSchema";
import PropTypes from "prop-types";

const getType = (code) => {
    return code.substring(0, 2)
}

const getNumber = (code) => {
    return code.split('/')[1]
}

const InvolvementNumberReportInput = (props) => {
    const year = new Date().getFullYear();
    const name = props.name === 'act_number' ? 'Act number' : 'Report number';

    const {
        values,
        handleChange,
        handleBlur,
        setValues,
        touched,
        errors
    } = useFormik({
        initialValues: {
            [props.type]: 'ОР',
            [props.name]: '',
        },
        validationSchema: validationSchema(props.type, props.name)
    });

    useEffect(() => {
        setValues({
            [props.type]: props.defaultValue === undefined ? 'ОР' : getType(props.defaultValue),
            [props.name]: props.defaultValue === undefined ? '' : getNumber(props.defaultValue)
        });
    }, [props]);

    return (
        <>
            <FormControl sx={{
                display: 'flex',
                flexDirection: 'row',
                padding: '0 10px',
                marginBottom: '25px',
                marginTop: '10px',
                height: 60
            }}>
                <Select
                    value={values[props.type]}
                    onChange={handleChange}
                    name={props.type}
                >
                    <MenuItem value={'ОР'}>ОР</MenuItem>
                    <MenuItem value={'ГР'}>ГР</MenuItem>
                    <MenuItem value={'ТО'}>ТО</MenuItem>
                    <MenuItem value={'НР'}>НР</MenuItem>
                </Select>
                <Typography sx={{alignSelf: 'center'}}>
                    -08-{year}/
                </Typography>
                <TextField
                    required
                    label={name}
                    name={props.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[props.name]}
                    error={touched[props.name] && Boolean(errors[props.name])}
                    helperText={touched[props.name] && errors[props.name]}
                    sx={{width: 130}}
                />
            </FormControl>
        </>
    )
}

InvolvementNumberReportInput.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    defaultValue: PropTypes.string
}

export default InvolvementNumberReportInput;
