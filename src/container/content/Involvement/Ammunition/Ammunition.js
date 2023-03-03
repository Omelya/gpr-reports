import React, {useEffect, useState} from "react";
import AmmunitionInput from "./AmmunitionInput";
import PropTypes from "prop-types";
import {Button, FormControl, Input, InputLabel, Paper, Typography} from "@mui/material";
import Box from "@mui/material/Box";

const Ammunition = (props) => {
    const [ammunition, setAmmunition] = useState([]);
    const [allAmmunitionValue, setAllAmmunitionValue] = useState(0);
    const [changeAmmunition, setChangeAmmunition] = useState(false);
    const removeAmmunition = (id) => {
        ammunition.splice(id, 1);
        setChangeAmmunition(true);
    }

    const sumAllAmmunitionValue = (id, values) => {
        ammunition.splice(id, 1, {
            name: values.name_ammunition, value: values.number_ammunition
        });

        setChangeAmmunition(true);
    }

    useEffect(() => {
        if (props.ammunition) {
            const ammo = JSON.parse(props.ammunition);

            let ammoArray = [];

            for (let item in ammo) {
                ammoArray.push({name: item, value: ammo[item]});
            }

            setAmmunition(ammoArray);
            setAllAmmunitionValue(props.allAmmunition);
        } else {
            setAmmunition([]);
        }
    }, [props.ammunition]);

    useEffect(() => {
        if (changeAmmunition) {
            let allAmmoValue = 0;

            ammunition.map((item) =>
                allAmmoValue += Number(item.value)
            );

            setAllAmmunitionValue(allAmmoValue);
            setAmmunition(ammunition);
            setChangeAmmunition(false);
        }
    }, [changeAmmunition]);

    return (
        <Paper elevation={3} sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1.25rem',
            alignSelf: 'flex-start',
            gridColumn: 'span 5',
        }}>
            <Typography sx={{textAlign: 'center'}}>Identified GNPs</Typography>
            <Box sx={{display: 'flex', flexDirection: 'column', marginBottom: '15px'}}>
                {
                    ammunition.map((item, key) =>
                        item.name !== undefined &&
                        <AmmunitionInput
                            ammunition={item.name}
                            key={key}
                            id={key}
                            value={item.value}
                            handleRemove={removeAmmunition}
                            handleSumAmmunitionValue={sumAllAmmunitionValue}
                        />
                    )
                }
            </Box>
            <Button
                fullWidth
                variant="contained"
                type='button'
                onClick={() => {
                    ammunition.push({
                        name: '',
                        value: '0'
                    })

                    setChangeAmmunition(true)
                }
            }>
                Add a field
            </Button>
            <FormControl sx={{marginTop: '15px'}}>
                <InputLabel htmlFor="all_ammunition">Total GNP</InputLabel>
                <Input
                    variant="standard"
                    size="small"
                    name="all_ammunition"
                    id="all_ammunition"
                    readOnly
                    value={allAmmunitionValue}
                    sx={{width: '70px'}}
                />
            </FormControl>

        </Paper>
    )
}

Ammunition.propTypes = {
    ammunition: PropTypes.string,
    allAmmunition: PropTypes.number
}

export default Ammunition;
