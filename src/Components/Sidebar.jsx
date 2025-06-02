import PostCard from "./PostCard";
import { updateUserPost } from "../store/userPost";
const Sidebar = ({posts,user}) => {
  
  return (
    posts && (
      <div className="h-svh overflow-y-scroll">
        <div>
          <div className="flex flex-col items-center flex-grow w-full">
            {posts && posts.length>0? (
              posts.map((data) => (
                <div className='m-4' key={data.post_id}>
                  <PostCard
                    data={{...data,...user}}
                    actionFunc={updateUserPost}
                  />
                </div>
              ))
            ) : (
              <h1 className="text-xl py-5">----- No post found -----</h1>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Sidebar;
