import {useInput} from "../../../../userHooks/useInput";
import {checkTypeInput} from "../../../../helpers/password/checkTypeInput";
import {TextField} from "@mui/material";
import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";

const Input = (props) => {
    const [errorMessage, setError] = useState('');

    const item = useInput(
        props.value ?? '',
        {isEmpty: props.isEmpty, minLength: props.minLength ?? 0}
    );

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

    return (
        <div className='flex flex-col m-2'>
            <TextField
                error={error}
                helperText={errorMessage}
                id={props.id}
                label={props.name}
                type={props.type ?? 'text'}
                name={props.id}
                value={item.value}
                onChange={e => {
                    item.onChange(e);
                    checkTypeInput(props.id, e.target.value);
                }}
                onBlur={e => item.onBlur(e)}
            />
        </div>
    )
}

Input.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    minLength: PropTypes.string,
    isEmpty: PropTypes.bool
}

export default Input;
