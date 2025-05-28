import CreatePost from "./CreatePost";
import Sidebar from "./Sidebar";

const Post = () => {


  return (
    <div className='flex flex-grow m-5 '>
        <Sidebar />
        <CreatePost/>
    </div>
  );
};

export default Post;
