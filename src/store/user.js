import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: null,
    reducers:{
        addUser: (state,action)=>{
            if(state===null) return action.payload;
            return Object.assign(state,action.payload);
        },
        removeUser: ()=>{
            return null;
        },
        addReactions: (state,action)=>{
            const newState = {
                ...state,
                ["reactions"]:action.payload
            }
            return newState;
        }

        
    }
})
export const {addUser,removeUser,addReactions} = user.actions;
export default user.reducer;
