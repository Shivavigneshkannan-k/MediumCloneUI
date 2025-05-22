import React from "react";

const EditProfile = () => {
  return <div>
    <div>
        <label>
        <span>Title</span>
        <input type="text" placeholder="Title"/>
        </label>
        <div>

        <span>Content</span>
        <textarea placeholder="Content with 500words"></textarea>
        </div>
    </div>
  </div>;
};

export default EditProfile;
