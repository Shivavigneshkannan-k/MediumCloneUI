import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import axios from "axios";
import { useEffect } from "react";
import { API } from "../utils/constants";
import { addUserPost, updateUserPost } from "../store/userPost";
import { addReactions } from "../store/user";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({posts,user}) => {
  
  return (
    posts && (
      <div className="h-svh overflow-y-scroll">
        <div>
          <div className="flex flex-col items-center">
            {posts && posts? (
              posts.map((data) => (
                <div className='m-4' key={data.post_id}>
                  <PostCard
                    data={{...data,...user}}
                    actionFunc={updateUserPost}
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
