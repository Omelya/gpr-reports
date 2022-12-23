import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const INVOLVEMENT = 'http://localhost:8000/api/involvement/';

export const fetchInvolvement = createAsyncThunk('involvement/fetchInvolvement', async (involvementId) => {
    try {
        const response = await axios.get(INVOLVEMENT + involvementId);
        return response.data;
    } catch (error) {
        return error.message;
    }
})

const involvementSlice = createSlice({
    name: 'involvement',
    initialState: [],
    reducers: {
        cleanUpInvolvement: (state, action) => {
            return action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchInvolvement.fulfilled, (state, action) => {
                return action.payload;
            })
    }
})

export const {cleanUpInvolvement} = involvementSlice.actions;

export default involvementSlice.reducer;
