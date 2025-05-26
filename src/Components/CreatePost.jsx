import axios from "axios";
import React, { useState } from "react";
import { API, } from "../utils/constants";
import { useDispatch} from "react-redux";
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
    <div className='w-full '>
      <div className='mt-20 p-4 flex flex-col gap-10 '>
        <div className='flex flex-col '>
          <p className='text-md w-[80%] mx-auto mb-4'>Title</p>
          <input
            type='text'
            value={newPost.title}
            onChange={(e) => {
              handleChange(e);
            }}
            name='title'
            className='border w-[80%] px-2 py-2 mx-auto'
            placeholder='Title'
          />
        </div>

        <div className='flex flex-col '>
          <p className='text-md w-[80%] mx-auto mb-4'>Content</p>
          <textarea
            placeholder='Content with 500words'
            name='body'
            onChange={(e) => {
              handleChange(e);
            }}
            value={newPost.body}
            className='mx-auto border w-[80%] px-2 py-2 h-64'></textarea>
        </div>
        <div className='flex justify-end'>
          <button
            className='btn btn-success w-20'
            onClick={() => createNewPost()}>
            POST
          </button>
        </div>
        <p className="text-red-600">{newPost.error}</p>
      </div>
    </div>
  );
};

export default CreatePost;
