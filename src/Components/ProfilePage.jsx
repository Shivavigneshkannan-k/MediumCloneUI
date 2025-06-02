import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { handleFollow } from "../utils/handlefollow";
import { API, TOAST_CONFIG } from "../utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "./userCard";
import { addUserPost } from "../store/userPost";
import EditProfile from "./EditProfile";

const ProfilePage = () => {
  const { userId } = useParams();
  const { posts, user } = useSelector((store) => store.userPost);
  const currentUser = useSelector((store) => store.user);
  const [followersData, setFollowersData] = useState(null);
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await axios.get(`${API}/view/user/post/${userId}`, {
          withCredentials: true
        });
        console.log(userData.data.data);
        dispatch(addUserPost(userData.data.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, [userId, showEdit]);

  const fetchUserFollowers = async (type, userId) => {
    try {
      const data = await axios.get(`${API}/follow/${type}/${userId}`, {
        withCredentials: true
      });
      setFollowersData(data.data.data);
      console.log(followersData);
    } catch (err) {
      toast.error(err?.message, TOAST_CONFIG);
    }
  };

  return (
    <div>
      <div
        className={`flex m-5 lg:fixed lg:flex-row flex-col-reverse w-full flex-grow items-center lg:items-start gap-4 relative
      ${!showEdit ? "flex" : "hidden"}`}>
        <div className='lg:w-2/3 w-full border-r border-slate-200 '>
          <p className='text-3xl text-center py-2 hover:underline '>Posts</p>
          <Sidebar
            posts={posts}
            user={user}
          />
        </div>
        <div className='lg:w-1/3 w-full lg:border-0 border-b border-slate-200 flex flex-col items-center p-4 gap-2'>
          <img
            src={user?.photo_url}
            alt={user?.username + " photo" || "user photo"}
            className='w-50 h-50 object-scale-down rounded-full border'
          />

          <p className='text-2xl'>@{user?.username}</p>
          <div className='text-lg'>{user?.about}</div>
          {user?.user_id == currentUser?.user_id && (
            <button
              className='btn bg-black text-white w-22'
              onClick={() => {
                setShowEdit((prev) => !prev);
              }}>
              Edit
            </button>
          )}
          {user?.user_id != currentUser?.user_id && (
            <button
              className='btn w-24 my-4 rounded-4xl bg-black text-white'
              onClick={() => {
                handleFollow(dispatch, user, userId);
              }}>
              {user?.follow ? "unfollow" : "follow"}
            </button>
          )}
          <div className='flex flex-col gap-4 border-t w-full border-slate-200 justify-center py-2 mx-2'>
            <div className='flex justify-center flex-grow gap-8 my-2'>
              <button
                className='btn'
                onClick={() => fetchUserFollowers("followers", userId)}>
                Followers
              </button>
              <button
                className='btn'
                onClick={() => fetchUserFollowers("following", userId)}>
                Following
              </button>
              <button
                className='btn'
                onClick={() => setFollowersData(null)}>
                Hide
              </button>
            </div>
            <div className='flex flex-col items-center gap-4 overflow-y-scroll'>
              {followersData &&
                followersData.map((person, index) => (
                  <UserCard
                    person={person}
                    key={index}
                  />
                ))}
            </div>

            {/* <button className="hover:underline underline-offset-2 cursor-pointer">Following</button> */}
          </div>
        </div>
        <ToastContainer className='lg:mt-[5%] mt-[10%]' />
      </div>
      <div className={`justify-center w-full ${showEdit ? "flex" : "hidden"}`}>
        <EditProfile setShowEdit={setShowEdit} />
      </div>
    </div>
  );
};

export default ProfilePage;
