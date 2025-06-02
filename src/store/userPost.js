import { createSlice } from "@reduxjs/toolkit";
const userPost = createSlice({
  name: "userPost",
  initialState: {user:null,posts:[]},
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
      if(!state) return state;
      return state.posts.filter((element)=> element.post_id!=action.payload);
    },
    updateCreatorDetail: (state,action)=>{

      const {type,value} = action.payload;
      const newDetails = {...state.user,[type]:value};
      console.log(newDetails);
      return {user:newDetails,posts:state.posts};

    }
  }
});

export const {addUserPost,removePost,updateUserPost,updateCreatorDetail} = userPost.actions;
export default userPost.reducer;
