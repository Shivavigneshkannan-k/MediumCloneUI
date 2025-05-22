import PostCard from "./PostCard"
const Feed = () => {
  return (
    <div className="flex justify-center p-4 h-dvh">
      <div className="w-[80%]">
        <h1 className="text-5xl text-center mb-8">Our Blog</h1>
        <div className="flex gap-4 flex-wrap">
          <PostCard/>
          <PostCard/>
          <PostCard/>
          <PostCard/>

        </div>
        <div></div>

      </div>
    </div>
  );
};

export default Feed;
