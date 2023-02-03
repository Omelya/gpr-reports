import { configureStore } from "@reduxjs/toolkit";
import ammunitionReducer from "./reducer/ammunitionReducer";
import involvementReducer from "./reducer/involvementReducer";
import usersReducer from "./reducer/usersReducer";

export default configureStore({
    reducer: {
        ammunition: ammunitionReducer,
        involvement: involvementReducer,
        users: usersReducer
    }
})
