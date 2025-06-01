import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { API } from "../utils/constants";
import axios from "axios";
import { addUserPost } from "../store/userPost";

const ProfilePage = () => {
    const {userId} = useParams()
    const {posts,user} = useSelector(store => store.userPost);
    const currentUser = useSelector(store=>store.user);
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchUserData = async ()=>{
            try{
                const userData = await axios.get(`${API}/view/user/post/${userId}`,{withCredentials:true});
                console.log(userData.data.data)
               dispatch(addUserPost(userData.data.data))
            }catch(err){
                console.log(err);
            }

        }
        fetchUserData();
    },[])
//   const user = useSelector((store) => store.user);
  return (
      <div className='flex m-5 absolute lg:flex-row flex-col-reverse w-full flex-grow items-center lg:items-start gap-4 '>
        <div className="lg:w-2/3 w-full border-r border-slate-200 ">
        <p className="text-3xl text-center py-2">Posts</p>
            <Sidebar posts={posts} user={user}/>
        </div>
      <div className="lg:w-1/3 w-full lg:border-0 border-b border-slate-200 flex flex-col items-center p-4 gap-2">
        <img
          src={user?.photo_url}
          alt={user?.username + " photo" || "user photo"}
          className='w-50 h-50 object-scale-down rounded-full border'
        />
        <p className='text-2xl'>@{user?.username}</p>
        <div className="text-lg">{user?.about}</div>
        {user?.user_id!=currentUser?.user_id && <button className="btn w-24 my-4 rounded-4xl bg-black text-white">follow</button>}
      </div>
    </div>
  );
};

export default ProfilePage;
