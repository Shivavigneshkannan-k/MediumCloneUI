import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import axios from "axios";
import { useEffect } from "react";
import { API } from "../utils/constants";
import { addUserPost } from "../store/userPost";
import { addReactions } from "../store/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({isOpen,setIsOpen}) => {
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

  // if(!isOpen){
  //   return <>hdak</>
  // }
  return (
    userPost && (
      <div className={`h-svh overflow-y-scroll fixed z-10  lg:w-[30%] bg-white transition-transform ease duration-1000 ${!isOpen && "translate-x-[-110%]"}`}>
        {isOpen && <button onClick={()=>setIsOpen(prev=>!prev)} className="btn border-0 rounded-full hover:bg-slate-200 transition duration-100 ease">
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>}
        <div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl text-left font-serif py-4 px-4 w-full bg-white z-20 sticky top-0">User post</h2>
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
