import axios from "axios";
import { useState } from "react";
import { API, TOAST_CONFIG } from "../utils/constants";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import useFetchComments from "../hooks/useFetchComments";


const Comments = ({ post_id }) => {
  const user = useSelector((store) => store.user);
  const [commentData, setCommentData] = useState([]);
  const [newComment, setNewComment] = useState("");
  const handleDeleteComment = async (comment_id) =>{
    try{
        await axios.delete(`${API}/comment/delete/${comment_id}`,{withCredentials:true});
        toast.success("comment is successfully deleted!!!")
        const changeComments = commentData.filter(comment => comment.comment_id!=comment_id);
        setCommentData(changeComments);
    }catch(err){
        toast.err(err?.response?.data?.message || err.message, TOAST_CONFIG)
    }
}
  const createNewComment = async () => {
    try {
      if (!newComment) {
        throw new Error("Can't post an empty comment!!");
      }
      const newCommentData = await axios.post(
        `${API}/comment/create`,
        {
          post_id: post_id,
          commenter_id: user?.user_id,
          comment: newComment
        },
        { withCredentials: true }
      );
      setCommentData((prev) => {
        return [...prev, newCommentData.data.data];
      });
      setNewComment("");
      toast.success("your comment is successfully added",TOAST_CONFIG);
    } catch (err) {
        console.log(err);
      toast.error(err?.response?.data?.message || err.message, TOAST_CONFIG);
    }
  };

  useFetchComments(post_id,setCommentData)
  
  return (
    <div className='flex flex-col gap-1 m-2 p-2'>
      <ToastContainer className='mt-[5%]' />
      <p className='p-2 font-bold text-lg '>Comments</p>
      {user && <div className='flex flex-grow justify-between lg:mx-2 items-center'>
        <input
          type='text'
          value={newComment}
          className='lg:w-9/12 w-[90%] my-2 p-2 outline-0 border border-slate-200 rounded-md'
          placeholder='Share your thoughts...'
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className='btn bg-blue-300 mx-2'
          onClick={()=>createNewComment()}>
          post
        </button>
      </div>}
      {commentData && commentData.length ? (
        commentData.map((comment) => (
          <Comment
            key={comment.comment_id}
            comment={comment}
            user ={user}
            handleDeleteComment={handleDeleteComment}
          />
        ))
      ) : (
        <p className='text-md text-center py-2 border border-slate-400 lg:mx-2 my-4 rounded-b-md'>
          Be the first to comment
        </p>
      )}
    </div>
  );
};

export default Comments;
