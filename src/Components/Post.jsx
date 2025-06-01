import { useState } from "react";
import CreatePost from "./CreatePost";
import Sidebar from "./Sidebar";
import Comments from "./Comments";

const Post = () => {
  const [isOpen,setIsOpen] = useState(false);

  return (
    <div className='flex flex-grow m-5 relative'>
        {/* <Sidebar isOpen = {isOpen} setIsOpen={setIsOpen}/> */}
        <CreatePost isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  );
};

export default Post;
