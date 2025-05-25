
import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./user"
import feedReducer  from "./feedSlice"

const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed: feedReducer,
    }
})


export default appStore;