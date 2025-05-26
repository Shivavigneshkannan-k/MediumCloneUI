import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import axios from "axios";
import { useEffect } from "react";
import { API } from "../utils/constants";
import { addUserPost } from "../store/userPost";
import { addReactions } from "../store/user";

const Sidebar = () => {
  const dispatch = useDispatch();
  const userPost = useSelector((store) => store.userPost);
  console.log(userPost)
  useEffect(() => {
    const fetchUserPost = async () => {
      try {
        const data = await axios.get(API + "/view/user/post", {
          withCredentials: true
        });
        const userReaction = await axios.get(API + "/view/user/reaction", {
          withCredentials: true
        });
        const reactionMap = await userReaction?.data?.data.reduce(
          (mpp, rec) => {
            mpp[rec.post_id] = rec.reaction;
            return mpp;
          },
          {}
        );

        dispatch(addReactions(reactionMap));
        console.log(typeof data.data.data)
        dispatch(addUserPost(data.data.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserPost();
  }, []);

  return (
    userPost && (
      <div className=' bg-amber-900 text-white h-dvh pt-10 overflow-y-scroll'>
        <div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl text-center">User post</h2>
            {userPost && userPost? (
            
              userPost.map((data) => (
                <div className='m-4' key={data.post_id}>
                  <PostCard
                    data={data}
                  />
                </div>
              ))
            ) : (
              <h1>No post found</h1>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Sidebar;
