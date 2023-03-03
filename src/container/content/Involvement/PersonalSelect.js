import React, {useEffect, useState} from "react";
import personal from "../../JSON/personal.json"
import PropTypes from "prop-types";
import {Button, FormControl, InputLabel, MenuItem, Paper, Select} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

const PersonalSelect = (props) => {
    const [value, setValue] = useState(['']);
    const [addPersonField, setAddPersonField] = useState(false);
    const [editPerson, setEditPerson] = useState(false);
    const setPerson = (id, name) => {
        if (name) {
            value.splice(id, 1, name);
        } else {
            value.length > 1 &&
            value.splice(id, 1);
        }

        setValue(value);
    }

    let persons = [];

    personal.forEach(item => {
        persons.push(item.first_name + ' ' + item.second_name);
    })

    useEffect(() => {
        setEditPerson(false);
    }, [editPerson])

    useEffect(() => {
        setValue(props.personal !== undefined
            ? JSON.parse(props.personal)
            : ['']
        );
    }, [props.personal]);

    useEffect(() => {
        if (addPersonField) {
            value.push('');
            setValue(value);
        }

        setAddPersonField(false);
    }, [addPersonField])

    return (
        <Paper elevation={3} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            alignSelf: 'flex-start',
            padding: '1.25rem',
            marginRight: '1.25rem',
            gridColumn: 'span 4'
        }}>
            {
                value.map((item, key) =>
                    <FormControl required={true} key={key} sx={{margin: '10px', display: 'block'}}>
                        <InputLabel id="person">Involved personnel</InputLabel>
                        <Select
                            labelId="person"
                            label="Involved personnel"
                            value={item.name ?? item}
                            onChange={e => {
                                setPerson(key, e.target.value);
                                setEditPerson(true);
                            }}
                            name="person"
                            sx={{
                                width: 250
                            }}
                        >

                            {
                                persons.map((item, key) =>
                                    <MenuItem key={key} value={item}>
                                        {item}
                                    </MenuItem>
                                )
                            }

                        </Select>
                        {
                            value.length > 1 &&
                            <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => {
                                    setPerson(key);
                                    setEditPerson(true);
                                }}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        }
                    </FormControl>
                )
            }
            <Button
                fullWidth
                variant="contained"
                sx={{margin: '10px'}}
                onClick={() => setAddPersonField(true)}
            >
                Add sapper
            </Button>
        </Paper>
    )
}

PersonalSelect.propTypes = {
    personal: PropTypes.string
}

export default PersonalSelect;
