import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: {

    },
    reducers:{
        addUser: (state,action)=>{
            return action.payload;
        },
        removeUser: ()=>{
            return {};
        }
        
    }
})
export const {addUser,removeUser} = user.actions;
export default user.reducer;
