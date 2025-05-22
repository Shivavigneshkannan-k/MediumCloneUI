import React from "react";

const EditProfile = () => {
  return <div className="w-full ">
    <div className="mt-20 p-4 flex flex-col gap-10 ">

        <div className="flex flex-col ">
          <p className="text-md w-[80%] mx-auto mb-4">Title</p>
          <input type="text" className="border w-[80%] px-2 py-2 mx-auto" placeholder="Title"/>
        </div>

        <div className="flex flex-col ">
          <p className="text-md w-[80%] mx-auto mb-4">Content</p>
          <textarea placeholder="Content with 500words" className="mx-auto border w-[80%] px-2 py-2 h-64"></textarea>
        </div>
        <div className="flex justify-end" >
        <button className="btn btn-success w-20  ">POST</button>

        </div>
    </div>
  </div>;
};

export default EditProfile;
