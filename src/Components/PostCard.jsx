
import { useDispatch, useSelector } from "react-redux";
import { API } from "../utils/constants";
import axios from "axios";
import { addReactions } from "../store/user";
import { useState } from "react";

const PostCard = ({data}) => {
  const reactionMap = useSelector(store => store.user.reactions);
  const {title,body,post_id} = data;
  // const [likes,setLikes] = useState(parseInt(data.likes));
  // const [dislikes,setDislikes] = useState(parseInt(data.dislikes));
  const dispatch = useDispatch();
  
  const handleReaction = async(reaction)=>{
    if(!reactionMap[post_id] || reactionMap[post_id]!==reaction ){
      dispatch(addReactions({...reactionMap,[post_id]:reaction}));
      // if(reactionMap[post_id]){
      //  if(reactionMap[post_id]===reaction )
      //   {
      //     if(reaction==='like'){setLikes(likes-1)}
      //     else{ setDislikes(dislikes-1);}
      //   }
      //   else{
      //     if(reaction==='like'){setDislikes(prev=> prev-1); setLikes(prev=>prev+1)}
      //     else{setDislikes(prev=> prev+1); setLikes(prev=>prev-1)}

      //   }
      // }
      
    }
    else{
      dispatch(addReactions({...reactionMap,[post_id]:''}));
    }
    await axios.post(API+`/status/${reaction}/${post_id}`,{},{withCredentials:true});
  }
  return (
    <div>
      <div className='card text-black w-96 rounded-xl bg-orange-200'>
        <div className='card-body'>
            <h2 className='card-title'>{title}</h2>
          <p>
            {body}
          </p>
          <div className='card-actions justify-between mt-2'>
            <button className="btn btn-neutral w-14 h-8">Delete</button>
            
            <div className="flex justify-between gap-4">
            <button className={(reactionMap[post_id]==='like'?"btn-success":"")+' btn w-20 h-8'} onClick={()=>{handleReaction("like")}}>{data.likes} Like </button>
            <button className={(reactionMap[post_id]==='dislike'?"btn-error":"")+' btn w-22 h-8'} onClick={()=>{handleReaction("dislike")}}>{data.dislikes} Dislike </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
