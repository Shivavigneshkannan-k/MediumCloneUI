import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ person }) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>{navigate(`/profile/${person?.user_id}`)}} className='hover:bg-slate-100 hover:text-black hover:border flex bg-black text-white transition duration-300 ease-in-out shadow-md lg:w-2/3 w-1/2 justify-between px-4 py-3 rounded-md items-center'
    >
      <img
        src={person?.photo_url}
        alt={"user photo"}
        className='w-15 h-15 rounded-full object-cover border-white border-2'
      />
      <p className=''>@{person?.username}</p>
    </div>
  );
};

export default UserCard;
