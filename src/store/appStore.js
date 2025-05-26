
import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./user"
import feedReducer  from "./feedSlice"
import userPostReducer  from "./userPost"

const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed: feedReducer,
        userPost: userPostReducer,

    }
})


export default appStore;