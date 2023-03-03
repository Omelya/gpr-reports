import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {useFormik} from "formik";
import validationSchema from "./validationSchema";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";

const Coordinates = (props) => {
    let coordinates = props.coordinates === undefined
        ? ''
        : JSON.parse(props.coordinates)[`${props.type}`];

    const {
        values,
        handleChange,
        handleBlur,
        setValues,
        touched,
        errors
    } = useFormik({
        initialValues: {
            [props.name]: coordinates,
        },
        validationSchema: validationSchema(props.name)
    });

    useEffect(() => {
        setValues({[props.name]: coordinates})
    }, [props.coordinates]);

    return(
        <>
            <Box sx={{
                padding: 1,
                height: 40,
            }}>
                <TextField
                    required
                    name={props.name}
                    label={props.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[props.name]}
                    error={touched[props.name] && Boolean(errors[props.name])}
                    helperText={touched[props.name] && errors[props.name]}
                />
            </Box>
        </>
    )
}

Coordinates.propTypes = {
    name: PropTypes.string.isRequired,
    coordinates: PropTypes.string,
    type: PropTypes.string.isRequired,
    justifyContent: PropTypes.string
}

export default Coordinates;
