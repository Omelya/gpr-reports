import React, {useEffect} from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import {InputAdornment, TextField} from "@mui/material";
import {useFormik} from "formik";
import validationSchema from "./validationSchema";

const Examined = (props) => {
    const {
        values,
        handleChange,
        handleBlur,
        setValues,
        touched,
        errors
    } = useFormik({
        initialValues: {
            examined: 0
        },
        validationSchema: validationSchema('examined')
    });

    useEffect(() => {
        setValues({examined: props.value ?? 0})
    }, [props.value]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0.5rem'
        }}>
            <TextField
                required
                name="examined"
                label="Examined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.examined}
                InputProps={{
                    endAdornment: <InputAdornment position="end">ga</InputAdornment>,
                }}
                error={touched.examined && Boolean(errors.examined)}
                helperText={touched.examined && errors.examined}
            />
        </Box>
    )
}

Examined.propTypes = {
    value: PropTypes.number
}

export default Examined;
