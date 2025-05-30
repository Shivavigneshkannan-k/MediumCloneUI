import { useEffect } from "react";
import { API, TOAST_CONFIG } from "../utils/constants";
import axios from "axios";
import { toast } from "react-toastify";

const useFetchComments = (post_id,setCommentData)=>{
    useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await axios.get(`${API}/comment/read/${post_id}`, {
          withCredentials: true
        });
        if (data.data.data.length > 0) {
          setCommentData(data.data.data);
        }
      } catch (err) {
       
        toast.error(err?.response?.data?.message || err.message, TOAST_CONFIG);
      }
    };
    fetchComments();
  }, []);
}

export default useFetchComments;