import {createSlice} from "@reduxjs/toolkit";

export const ammunitionSlice = createSlice({
    name: 'ammunition',
    initialState: [],
    reducers: {
        addAmmunition: (state,action) => {
            state.push(action.payload)
        },
        deleteAmmunition: (state, action) => {
            return state.filter(item => item.id !== action.payload.id)
        }
    }
})

export const {addAmmunition, deleteAmmunition} = ammunitionSlice.actions;

export const getAmmo = (state, action) => {
    let ammo = [];

    if (action.length === 0) {
        return state;
    }

    for (let item in action) {
        ammo.push({
            name: item,
            value: action[item]
        })
    }

    ammo.push(...state)

    return ammo
}

export default ammunitionSlice.reducer;
