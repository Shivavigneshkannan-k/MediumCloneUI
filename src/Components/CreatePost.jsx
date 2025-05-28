import axios from "axios";
import React, { useState } from "react";
import { API } from "../utils/constants";
import { useDispatch } from "react-redux";
import { updateUserPost } from "../store/userPost";

const CreatePost = () => {
  const [newPost, setNewPost] = useState({ title: "", body: "", error: "" });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setNewPost((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const createNewPost = async () => {
    try {
      setNewPost({ title: "", body: "", error: "" });
      if (!newPost.title || !newPost.body) {
        setNewPost((prev) => ({
          ...prev,
          ["error"]: "fields can't be empty"
        }));
      } else {
        const post = await axios.post(API + "/post/create", newPost, {
          withCredentials: true
        });
        dispatch(updateUserPost(post.data.data));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className='w-[70%] fixed right-0 font-serif '>
      <div className='flex justify-end absolute lg:right-4 lg:top-4'>
          <button
            className='btn text-white bg-green-600'
            onClick={() => createNewPost()}>
              Publish
          </button>
        </div>
      <div className='flex flex-col m-6 p-4 gap-4 flex-grow'>
        <input
          type='text'
          value={newPost.title}
          onChange={(e) => {
            handleChange(e);
          }}
          name='title'
          className='min-h-22 placeholder:text-left px-4 text-4xl focus:outline-0 text-black'
          placeholder='Title'
        />

        <textarea
          placeholder='Tell your story...'
          name='body'
          onChange={(e) => {
            handleChange(e);
          }}
          value={newPost.body}
          className='min-h-72 focus:outline-0 px-4 py-2 text-xl text-black'></textarea>
        
      </div>
        <p className='text-red-600 text-center text-xl'>{newPost.error}</p>
    </div>
  );
};

export default CreatePost;
