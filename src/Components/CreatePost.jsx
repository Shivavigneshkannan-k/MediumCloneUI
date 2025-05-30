import axios from "axios";
import React, { useState } from "react";
import { API, TOAST_CONFIG } from "../utils/constants";
import { useDispatch } from "react-redux";
import { updateUserPost } from "../store/userPost";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bounce, toast, ToastContainer } from "react-toastify";

const CreatePost = ({ isOpen, setIsOpen }) => {
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
        throw new Error("fields can't be empty")
      } else {
        const post = await axios.post(API + "/post/create", newPost, {
          withCredentials: true
        });
        dispatch(updateUserPost(post.data.data));
      }
      toast.success("post is successfully published",TOAST_CONFIG);
    } catch (err) {
      toast.error(err.message, TOAST_CONFIG);
    }
  };

  return (
    <div
      className={`w-full lg:fixed lg:right-0 font-serif flex flex-col items-center relative transition-all duration-1000 ease ${
        isOpen == false ? "lg:w-full" : "lg:w-[70%]"
      }`}>
      {!isOpen && (
        <button
          className='btn absolute left-0 lg:p-6 p-4 shadow-md lg:pl-4 lg:rounded-r-2xl  transition duration-400 ease'
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}>
          <FontAwesomeIcon
            icon={faCloud}
            size='xl'
            className=''
          />
        </button>
      )}
      <div className='flex lg:absolute lg:right-4 lg:top-2 lg:mr-10'>
        <button
          className='btn text-white bg-green-600'
          onClick={() => createNewPost()}>
          Publish
        </button>
      </div>
      <div className='flex flex-col m-6 p-4 gap-4 flex-grow w-full lg:w-8/12'>
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
      <h2 className='lg:text-2xl text-xl text-center'>Writing on Medium</h2>
      <ToastContainer className="mt-[5%]"/>
      
    </div>
  );
};

export default CreatePost;
