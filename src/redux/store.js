import { configureStore } from "@reduxjs/toolkit";
import ammunitionReducer from "./reducer/ammunitionReducer";
import involvementReducer from "./reducer/involvementReducer";

export default configureStore({
    reducer: {
        ammunition: ammunitionReducer,
        involvement: involvementReducer
    }
})
