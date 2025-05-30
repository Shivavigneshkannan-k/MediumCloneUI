import axios from "axios";
import { useEffect,useState } from "react";
import { API } from "../utils/constants";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comment = ({ comment,user_id}) => {
  if (!comment) return <></>;
  return (
    <div className='flex items-center justify-between lg:max-w-5/6'>
      <div className='bg-slate-100 py-2 px-4 rounded-lg lg:max-w-5/6 lg:mx-2 flex flex-grow justify-between'>
        <p className=''>{comment?.comment}</p>
        <p className='text-end '>@{comment?.username}</p>
      </div>
      <div className="px-2 lg:max-w-1/6">
        {comment.commenter_id === user_id && <FontAwesomeIcon icon={faTrash} />}
      </div>
    </div>
  );
};
const Comments = ({ post_id }) => {
  const user = useSelector((store) => store.user);
  const [commentData, setCommentData] = useState([]);
  const [newComment, setNewComment] = useState("");
  const createNewComment = async () => {
    try {
      if (!newComment) {
        throw new Error("Can't post an empty comment!!");
      }
      const newCommentData = await axios.post(
        `${API}/comment/create`,
        {
          post_id: post_id,
          commenter_id: user.user_id,
          comment: newComment
        },
        { withCredentials: true }
      );
      setCommentData((prev) => {
        return [...prev, newCommentData.data.data];
      });
      setNewComment("");
      toast.success("your comment is successfully added", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "light",
          transition: Bounce
        });
    } catch (err) {
        console.log(err);
      toast.error(err?.response?.data?.message || err.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "light",
        transition: Bounce
      });
    }
  };
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await axios.get(`${API}/comment/read/${post_id}`, {
          withCredentials: true
        });
        if (data.data.data.length > 0) {
          setCommentData(data.data.data);
        }
      } catch (err) {
       
        toast.error(err?.response?.data?.message || err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "light",
          transition: Bounce
        });
      }
    };
    fetchComments();
  }, []);
  return (
    <div className='flex flex-col gap-1 m-2 p-2'>
      <ToastContainer className='mt-[5%]' />
      <p className='p-2 font-bold text-lg '>Comments</p>
      <div className='flex flex-grow justify-between lg:mx-2 items-center'>
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
      </div>
      {commentData ? (
        commentData.map((comment) => (
          <Comment
            key={comment.comment_id}
            comment={comment}
            user_id ={user.user_id}
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
