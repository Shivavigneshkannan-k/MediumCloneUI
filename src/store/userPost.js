import { createSlice } from "@reduxjs/toolkit";
const userPost = createSlice({
  name: "userPost",
  initialState: [],
  reducers: {
    addUserPost: (state, action) => action.payload,
    updateUserPost: (state, action) =>{
      if(!state) return state;
      const {user_reaction,post_id}= action.payload;
      const posts = state.posts.map(post => {
          if(post.post_id===post_id){
              return {...post,"user_reaction":user_reaction};
          }
          return post;
      })
      return {user:state.user,posts:posts};
    },
    removePost: (state,action) =>{
      return state.filter((element)=> element.post_id!=action.payload);
    }
  }
});

export const {addUserPost,removePost,updateUserPost} = userPost.actions;
export default userPost.reducer;
