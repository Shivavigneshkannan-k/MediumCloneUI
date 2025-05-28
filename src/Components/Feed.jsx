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
    <div className='flex flex-grow justify-center py-10'>
      <div className='lg:w-6/12 md:10/12'>
        <div className='flex flex-col justify-center gap-2 '>
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
      </div>
    </div>
  );
};

export default Feed;
