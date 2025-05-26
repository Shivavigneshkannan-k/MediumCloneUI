
import { useDispatch, useSelector } from "react-redux";
import { API } from "../utils/constants";
import axios from "axios";
import { addReactions } from "../store/user";
import { useState } from "react";
import {removePost} from "../store/userPost"
import { removeFeedPost } from "../store/feedSlice";

const PostCard = ({data}) => {
  const reactionMap = useSelector(store => store.user.reactions);
  const user = useSelector(store => store.user)
  const {title,body,post_id,user_id} = data;
  const [likes,setLikes] = useState(parseInt(data.likes));
  const [dislikes,setDislikes] = useState(parseInt(data.dislikes));
  const dispatch = useDispatch();
  
  const handleReaction = async(reaction)=>{
    try{
      await axios.post(API+`/status/${reaction}/${post_id}`,{},{withCredentials:true});
      const prev = reactionMap[post_id] ;
      if(!prev|| prev!==reaction ){
        if(prev){
          if(reaction==='like') {setLikes(likes+1); setDislikes(dislikes-1);}
          else {setDislikes(dislikes+1); setLikes(likes-1);}
        }
        else{
          if(reaction==='like') setLikes(likes+1);
          else setDislikes(dislikes+1)
        }
        dispatch(addReactions({...reactionMap,[post_id]:reaction}));
      }
      else{
        if(reaction==='like') setLikes(likes-1);
        else setDislikes(dislikes-1)
        dispatch(addReactions({...reactionMap,[post_id]:''}));
      }
    }
    catch(err){
      console.log(err);
    }
  }

  const deletePost = async()=>{
    try{
        await axios.delete(API+"/post/delete/"+post_id,{withCredentials:true});
        dispatch(removePost(post_id))
        dispatch(removeFeedPost(post_id))
        console.log("successfully deleted")
    }catch(err){
      console.log(err)
    }
  }



  return (
    <div>
      <div className='card text-black w-96 rounded-xl bg-orange-200'>
        <div className='card-body'>
          <div className="flex justify-between">
            <h2 className='card-title'>{title}</h2>
             { user_id === user.user_id &&  <button className="btn btn-neutral w-14 h-8" onClick={deletePost}>Delete</button>}
          </div>
          <p>
            {body}
          </p>
          <div className='card-actions justify-between mt-2'>
          
            
            <div className="flex gap-4 justify-end w-full">
            <button className={(reactionMap[post_id]==='like'?"btn-success":"")+' btn w-20 h-8'} onClick={()=>{handleReaction("like")}}>{likes} Like </button>
            <button className={(reactionMap[post_id]==='dislike'?"btn-error":"")+' btn w-22 h-8'} onClick={()=>{handleReaction("dislike")}}>{dislikes} Dislike </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
