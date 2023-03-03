import React from "react";
import position from "../../../JSON/position.json";
import rank from "../../../JSON/rank.json";
import {useInput} from "../../../../userHooks/useInput";
import {useMemo, useState} from "react";
import {Autocomplete, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

const getPosition = (id) => {
    return id === 'position' ? position : rank;
}

const InputSelect = (props) => {
    const [errorMessage, setError] = useState('');

    const item = useInput('', {isEmpty: props.isEmpty})

    let error = (item.isEmpty && item.isDirty) || (item.isDirty && item.minLengthError);

    useMemo(() => {
        if (!error) {
            return setError('')
        }

        switch (error) {
            case item.isDirty:
                setError(`Please enter your ${props.id}`);
                break;
            case item.minLengthError:
                setError(`${props.name} must be at least ${props.minLength} characters long`);
                break;
        }
    }, [error]);

    return(
        <Autocomplete
            options={getPosition(props.id)}
            onChange={e => item.onChange(e)}
            getOptionLabel={(option) => option.item ?? ''}
            renderOption={(props, option) => (
                <Box component="li" sx={{ mr: 2, flexShrink: 0 }} {...props}>
                    {option.item}
                </Box>
            )}
            onBlur={e => item.onBlur(e)}
            renderInput={(params) =>
                <TextField
                    {...params}
                    id={props.id}
                    name={props.id}
                    error={error}
                    helperText={errorMessage}
                    label={props.name}
                    inputProps={{
                        ...params.inputProps,
                    }}
                />
        }/>
    )
}

InputSelect.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    isEmpty: PropTypes.bool,
    minLength: PropTypes.number
}

export default InputSelect;
