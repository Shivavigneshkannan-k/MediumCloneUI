import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Comment = ({ comment,user,handleDeleteComment}) => {
  const user_id = user?.user_id;
  if (!comment) return <></>;
  return (
    <div className='flex items-center justify-between lg:max-w-5/6'>
      <div className='bg-slate-100 py-2 px-4 rounded-lg lg:max-w-5/6 lg:mx-2 flex flex-grow justify-between'>
        <p className=''>{comment?.comment}</p>
        <p className='text-end '>@{comment?.username}</p>
      </div>
      <button onClick={()=>{handleDeleteComment(comment?.comment_id)}} className="px-2 lg:max-w-1/6 ">
        {(comment.commenter_id === user_id || user?.role=='admin') && <FontAwesomeIcon icon={faTrash} />}
      </button>
    </div>
  );
};
export default Comment;