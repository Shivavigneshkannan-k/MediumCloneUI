import { useDispatch, useSelector } from "react-redux";
import { API, TOAST_CONFIG } from "../utils/constants";
import axios from "axios";
import { useState } from "react";
import { removePost } from "../store/userPost";
import { removeFeedPost } from "../store/feedSlice";
import Comments from "./Comments";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const PostCard = ( {data,actionFunc} ) => {
  const user = useSelector(store => store.user);
  const [likes, setLikes] = useState(parseInt(data?.likes||0));
  const [dislikes, setDislikes] = useState(parseInt(data?.dislikes||0));
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const [showComments, setShowComments] = useState(false);

  const handleReaction = async (reaction) => {
    try {
      await axios.post(
        API + `/status/${reaction}/${data?.post_id}`,
        {},
        { withCredentials: true }
      );
      const userReaction = data?.user_reaction;
      if (!userReaction || userReaction !== reaction) {
        if (userReaction) {
          if (reaction === "like") {
            setLikes(likes + 1);
            setDislikes(dislikes - 1);
          } else {
            setDislikes(dislikes + 1);
            setLikes(likes - 1);
          }
        } else {
          if (reaction === "like") setLikes(likes + 1);
          else setDislikes(dislikes + 1);
        }
        dispatch(actionFunc({post_id:data?.post_id,user_reaction:reaction}));
      } else {
        if (reaction === "like") setLikes(likes - 1);
        else setDislikes(dislikes - 1);
        dispatch(actionFunc({post_id:data?.post_id,user_reaction:null}));
      }
    } catch (err) {
     toast.error(err?.response?.data?.message||err.message,TOAST_CONFIG)
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(API + "/post/delete/" + data?.post_id, {
        withCredentials: true
      });
      dispatch(removePost(data?.post_id));
      dispatch(removeFeedPost(data?.post_id));
      toast.success("successfully deleted",TOAST_CONFIG)
    } catch (err) {
      toast.error(err?.response?.data?.message||err.message,TOAST_CONFIG)
    }
  };
  return (
    <div>
      <div className='card text-black flex flex-grow  border-slate-200 shadow-md lg:min-w-2xl'>
        <div className="flex px-4 py-2 items-center gap-4 font-serif cursor-pointer" onClick={()=>{
          navigate('/profile/'+data.user_id);
        }} >
          <img className="w-10 h-10 rounded-full object-cover" src={data?.photo_url} alt="creator photo"/>
          <p className="text-lg">@{data?.username}</p>
        </div>
        <div className='card-body'>
          <div className='flex justify-between pb-1 flex-grow'>
            <h2 className='card-title lg:text-4xl text-md'>{data?.title}</h2>
            {data?.user_id === user?.user_id && (
              <button
                className='btn btn-neutral w-14 h-8'
                onClick={deletePost}>
                Delete
              </button>
            )}
          </div>
          <p className='py-1'>{data?.body}</p>
          <div className='card-actions justify-between mt-2'>
            <div className='flex gap-4 justify-end w-full'>
            <button
              className='btn w-36 h-8'
              onClick={() => setShowComments((prev) => !prev)}>
              {showComments ? "hide Comments" : "show Comments"}
            </button>
            
              <button
                className={
                  (data?.user_reaction === "like" ? "btn-success" : "") +
                  " btn w-20 h-8"
                }
                onClick={() => {
                  handleReaction("like");
                }}>
                {likes} Like{" "}
              </button>
              <button
                className={
                  (data?.user_reaction === "dislike" ? "btn-error" : "") +
                  " btn w-22 h-8"
                }
                onClick={() => {
                  handleReaction("dislike");
                }}>
                {dislikes} Dislike{" "}
              </button>
            </div>
          </div>

          <div>{showComments && <Comments post_id={data?.post_id} />}</div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
