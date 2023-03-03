import React, {useEffect} from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import {InputAdornment, TextField} from "@mui/material";
import {useFormik} from "formik";
import validationSchema from "./validationSchema";

const ExplosivesInput = (props) => {
    const {
        values,
        handleChange,
        handleBlur,
        setValues,
        touched,
        errors
    } = useFormik({
        initialValues: {
            [props.name]: 0
        },
        validationSchema: validationSchema([props.name])
    });

    useEffect(() => {
        setValues({[props.name]: props.value ?? 0});
    }, [props.value])

    return(
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0.5rem'
            }}>
                <TextField
                    required
                    name={props.name}
                    label={props.label}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[props.name]}
                    error={touched[props.name] && Boolean(errors[props.name])}
                    helperText={touched[props.name] && errors[props.name]}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{props.measurement}</InputAdornment>,
                    }}
                />
            </Box>
        </>
    )
}

ExplosivesInput.propTypes = {
    value: PropTypes.number,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    measurement: PropTypes.string.isRequired
}

export default ExplosivesInput;