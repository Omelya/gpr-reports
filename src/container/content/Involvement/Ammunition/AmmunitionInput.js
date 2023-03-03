import React, {useEffect} from "react";
import ammunition from "../../../JSON/ammunition.json";
import PropTypes from "prop-types";
import {Autocomplete, FormControl, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {useFormik} from "formik";
import validationSchema from "./validationSchema";

const AmmunitionInput = (props) => {
    const {
        values,
        handleChange,
        setFieldValue,
        handleBlur,
        touched,
        errors
    } = useFormik({
        initialValues: {
            name_ammunition: props.ammunition.replace(/(_|\\s)+/g, ' '),
            number_ammunition: props.value,
        },
        validationSchema: validationSchema('name_ammunition','number_ammunition')
    });

    useEffect(() => {
        if (values.name_ammunition !== '') {
            props.handleSumAmmunitionValue(props.id, values);
        }
    }, [values]);

    return (
        <FormControl data-id={props.id} sx={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: '10px',
                alignItems: 'stretch',
            }}>
            <Autocomplete
                options={ammunition}
                onChange={(e, value) => {
                    setFieldValue(
                        "name_ammunition",
                        value !== null
                            ? `${value.type} ${value.caliber}`
                            : values.name_ammunition
                    );
                }}
                inputValue={values.name_ammunition}
                getOptionLabel={(option) => `${option.type} ${option.caliber}`}
                renderOption={(props, option) => (
                    <Box component="li" sx={{mr: 2, flexShrink: 0}} {...props}>
                        {option.type} {option.caliber}
                    </Box>
                )}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        required
                        name='name_ammunition'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        label='Enter the type of ammunition'
                        error={touched.name_ammunition && Boolean(errors.name_ammunition)}
                        helperText={touched.name_ammunition && errors.name_ammunition}
                    />
                }
                sx={{
                    width: 305
                }}
            />
            <TextField
                name='number_ammunition'
                value={values.number_ammunition}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.number_ammunition && Boolean(errors.number_ammunition)}
                helperText={touched.number_ammunition && errors.number_ammunition}
                sx={{
                    width: 50
                }}
            />
            <IconButton
                aria-label="delete"
                size="small"
                onClick={() => props.handleRemove(props.id)}
                sx={{height: 50}}
            >
                <DeleteIcon/>
            </IconButton>
        </FormControl>
    )
}

AmmunitionInput.propTypes = {
    id: PropTypes.number,
    ammunition: PropTypes.string,
    value: PropTypes.string,
    handleRemove: PropTypes.func,
    handleSumAmmunitionValue: PropTypes.func,
}

export default AmmunitionInput;
