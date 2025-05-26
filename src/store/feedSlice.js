import { createSlice } from "@reduxjs/toolkit";

const feed = createSlice({
    name: "feed",
    initialState : null,
    reducers:{
        addFeed : (state,action)=>{
            return action.payload;
        },
        removeFeed:()=>{
            return null;
        },
        removeFeedPost: (state,action)=> state.filter(ele => ele.post_id!=action.payload)
    }
})

export const {addFeed,removeFeed,removeFeedPost} = feed.actions;
export default feed.reducer; 