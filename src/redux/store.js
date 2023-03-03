import { configureStore } from "@reduxjs/toolkit";
import involvementReducer from "./reducer/involvementReducer";

export default configureStore({
    reducer: {
        involvement: involvementReducer,
    }
})
