import { useEffect } from "react";
import PostCard from "./PostCard";
import axios from "axios";
import { API } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed} from "../store/feedSlice";
import { addReactions } from "../store/user";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);
  useEffect(() => {
    const fetchFeed = async () => {
      try {
          const data = await axios.get(API+"/view/reactions",{withCredentials:true});
          const userReaction = await axios.get(API+'/view/user/reaction',{withCredentials:true});
          const reactionMap = await userReaction?.data?.data.reduce((mpp,rec)=> 
            {
              mpp[rec.post_id]=rec.reaction;
              return mpp;
            },
          {});
          
          dispatch(addReactions(reactionMap));
          dispatch(addFeed(data.data.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeed();
  }, [dispatch]);


  return (
    <div className='flex justify-center p-4 h-dvh'>
      <div className='w-[80%]'>
        <h1 className='text-5xl text-center mb-8'>Our Blog</h1>
        <div className='flex gap-4 flex-wrap'>
          {feedData ? (
            feedData.map((data) => (
              <PostCard
                key={data.post_id}
                data = {data}
                />
            ))
          ) : (
            <h1>No post found</h1>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Feed;
