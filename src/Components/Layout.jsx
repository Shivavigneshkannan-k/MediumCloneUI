
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { API } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/user";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(store => store.user);

  useEffect(()=>{
    const isLoggedIn =async ()=>{
      try{
        const data = await axios.get(API+"/view/profile",{
          withCredentials: true
        })
        dispatch(addUser(data.data.data));
      }
      catch(error){
        console.log("error ",error.message);
        navigate("/login",{state:{from:location},replace:true});
      }
    }
    if(!user){
      isLoggedIn();
    }
  },[user,navigate,dispatch])
  return <div>
    <Navbar/>
    <Outlet/>
  </div>;
};

export default Layout;
