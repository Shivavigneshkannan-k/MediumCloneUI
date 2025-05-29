import { createSlice } from "@reduxjs/toolkit";
const userPost = createSlice({
  name: "userPost",
  initialState: [],
  reducers: {
    addUserPost: (state, action) => action.payload,
    updateUserPost: (state, action) => [...state,action.payload],
    removePost: (state,action) =>{
      return state.filter((element)=> element.post_id!=action.payload);
    }
  }
});

export const {addUserPost,removePost,updateUserPost} = userPost.actions;
export default userPost.reducer;
