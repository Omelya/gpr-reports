import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const GET_USER = 'http://localhost:8000/api/user';
const GET_CSRF_TOKEN = 'http://localhost:8000/sanctum/csrf-cookie';

export const fetchUser = createAsyncThunk('users/fetchUser', async (token) => {
    try {
        axios.defaults.withCredentials = true;

        const response = await axios.get(GET_CSRF_TOKEN).then(response => {
             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
             return axios.get(GET_USER)
        })

        return response.data;
    } catch (error) {
        return error.message;
    }
})

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        access_token: null,
        user: []
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                return state.user = action.payload;
            })
    }
})

export default usersSlice.reducer;