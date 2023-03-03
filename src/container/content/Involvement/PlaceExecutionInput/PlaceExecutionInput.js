import React, {useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import TextField from "@mui/material/TextField";
import parse from "autosuggest-highlight/parse";
import Grid from "@mui/material/Grid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import {debounce} from "@mui/material/utils";
import loadGoogle from "./LoadGoogle";

const autocompleteService = { current: null };

const PlaceExecutionInput = (props) => {
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const loaded = useRef(false);

    if (typeof window !== 'undefined' && !loaded.current) {
        loadGoogle();

        loaded.current = true;
    }

    const fetch = useMemo(
        () =>
            debounce((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 400),
        [],
    );

    useEffect(() => {
        setValue(props.value === undefined
            ? ''
            : props.value
        )
    }, [props.value])

    useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.place) {
            autocompleteService.current = window.place;
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return ;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <>
            <Box sx={{textAlign: 'center', padding: 1}}>
                <Autocomplete
                    getOptionLabel={(option) =>
                        typeof option === 'string' ? option : option.description
                    }
                    filterOptions={(x) => x}
                    options={options}
                    autoComplete
                    includeInputInList
                    filterSelectedOptions
                    value={value}
                    noOptionsText="No locations"
                    onChange={(event, newValue) => {
                        setOptions(newValue ? [newValue, ...options] : options);
                        setValue(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} required label="Add a location" name="place_execution" fullWidth />
                    )}
                    renderOption={(props, option) => {
                        const matches =
                            option.structured_formatting.main_text_matched_substrings || [];

                        const parts = parse(
                            option.structured_formatting.main_text,
                            matches.map((match) => [match.offset, match.offset + match.length]),
                        );

                        return (
                            <li {...props}>
                                <Grid container alignItems="center">
                                    <Grid item sx={{ display: 'flex', width: 44 }}>
                                        <LocationOnIcon sx={{ color: 'text.secondary' }} />
                                    </Grid>
                                    <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                        {parts.map((part, index) => (
                                            <Box
                                                key={index}
                                                component="span"
                                                sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                            >
                                                {part.text}
                                            </Box>
                                        ))}

                                        <Typography variant="body2" color="text.secondary">
                                            {option.structured_formatting.secondary_text}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </li>
                        );
                    }}
                />
            </Box>
        </>
    )
}

PlaceExecutionInput.propTypes = {
    value: PropTypes.string
}

export default PlaceExecutionInput;
