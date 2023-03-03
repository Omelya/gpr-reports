import React from "react";
import Box from "@mui/material/Box";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {TextField} from "@mui/material";
import {useState} from "react";
import PropTypes from "prop-types";

const Datetime = (props) => {
    const [datetime, setDatetime] = useState(
        props.value === undefined
            ? new Date()
            : new Date(props.value)
    );

    let dateFormat = props.dateFormat ?? "YYYY-MM-DD";

    return (
        <Box sx={{textAlign: 'center', padding: 1}}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                    label={props.label}
                    inputFormat={dateFormat}
                    value={datetime}
                    onChange={(date) => setDatetime(date)}
                    renderInput={(params) =>
                        <TextField
                            name={props.name}
                            sx={props.style}
                            {...params}
                        />
                    }
                />
            </LocalizationProvider>
        </Box>
    )
}

Datetime.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dateFormat: PropTypes.string,
    style: PropTypes.object
}

export default Datetime;
