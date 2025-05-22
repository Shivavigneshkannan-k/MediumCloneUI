import React from "react";

const Sidebar = () => {
  return (
    <div className="w-[20%] bg-amber-900 text-white h-dvh" >
      <div className="p-5 ">
        <div className="mb-4">
        <p className="hover:bg-amber-100 hover:text-black p-2 w-[100%] mb-3">Profile</p>
        <p className="hover:bg-amber-100 hover:text-black p-2 w-[100%]">Create Post</p>
        </div>
        <hr/>
      </div>
      <div>
        <p className="text-center text-xl">No Post available</p>
      </div>
    </div>
  );
};

export default Sidebar;
