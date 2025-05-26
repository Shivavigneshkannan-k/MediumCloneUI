import CreatePost from "./CreatePost";
import Sidebar from "./Sidebar";

const Post = () => {


  return (
    <div className='h-dvh grid grid-cols-12'>
      <div className="grid col-start-1 col-end-5">
        <Sidebar />
      </div>
      <div className="grid col-start-5 col-end-12">
        <CreatePost/>
      </div>
    </div>
  );
};

export default Post;
