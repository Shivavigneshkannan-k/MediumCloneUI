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
        removeFeedPost: (state,action)=> state.filter(ele => ele.post_id!=action.payload),
        updateReaction: (state,action)=>{
            // console.log(JSON.parse(JSON.stringify(state)));

            if(!state) return state;
            const {user_reaction,post_id}= action.payload;
            return state.map(post => {
                if(post.post_id===post_id){
                    return {...post,"user_reaction":user_reaction};
                }
                return post;
            })
        }
    }
})

export const {addFeed,removeFeed,removeFeedPost,updateReaction} = feed.actions;
export default feed.reducer; 