import React, {useEffect} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

const StatusSelect = (props) => {
    const addUnderlining = (value) => {
        let valueToLowerCase = value.charAt(0).toLowerCase() + value.slice(1);

        return valueToLowerCase.split(' ').join('_');
    }

    const [value, setValue] = useState(addUnderlining(props.item[0]));

    useEffect(() => {
        if (props.value) {
            setValue(addUnderlining(props.value));
        }
    }, [props.value]);

    return (
        <Box sx={{textAlign: 'center', padding: 1}}>
            <FormControl>
                <InputLabel id={props.name}>{props.label}</InputLabel>
                <Select
                    labelId={props.name}
                    label={props.label}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    name={props.name}
                    sx={props.style}
                >

                    {
                        props.item.map((item, key) =>
                            <MenuItem key={key} value={addUnderlining(item)}>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </MenuItem>
                        )
                    }

                </Select>
            </FormControl>
        </Box>
    )
}

StatusSelect.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    item: PropTypes.array.isRequired,
    value: PropTypes.string,
    style: PropTypes.object
}

export default StatusSelect;
