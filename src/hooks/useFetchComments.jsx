import { useEffect } from "react";
import { API, TOAST_CONFIG } from "../utils/constants";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const useFetchComments = (post_id,setCommentData)=>{
  const user = useSelector(store => store.user)
    useEffect(() => {
      console.log('re-rendering')
    const fetchComments = async () => {
      try {
        const data = await axios.get(`${API}/comment/read/${post_id}`, {
          withCredentials: true,
          headers:{
            role: (user && user.role) || 'guest'

          }
        });
        if (data.data.data.length > 0) {
          setCommentData(data.data.data);
        }
      } catch (err) {
       console.log(err)
        toast.error(err?.response?.data?.message || err.message, TOAST_CONFIG);
      }
    };
    fetchComments();
  }, []);
}

export default useFetchComments;