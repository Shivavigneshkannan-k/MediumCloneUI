import { matchPath, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { API, TOAST_CONFIG } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/user";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  console.log(location);

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const data = await axios.get(API + "/view/me", {
          withCredentials: true,
          headers:{
            role:'user'
          }
        });
        dispatch(addUser(data.data.data));
      } catch (err) {
        console.log("error ", err.message);
        toast.error(err?.response?.data?.message || err?.message,TOAST_CONFIG)
        if (!['/','/feed','/login'].includes(location?.pathname) && !matchPath("/profile/:userId",location?.pathname)) {
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };
    if (!user) {
      isLoggedIn();
    }
  }, [user, navigate, dispatch]);
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
