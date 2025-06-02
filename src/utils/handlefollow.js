import axios from "axios";
import { API, TOAST_CONFIG } from "./constants";
import { updateCreatorDetail } from "../store/userPost";
import { toast } from "react-toastify";

export const handleFollow = async (dispatch,user,userId) => {
    try {
      let data;
      if (user?.follow) {
        data = await axios.delete(
          `${API}/follow/${userId}`,
          { withCredentials: true}
        );
        dispatch(updateCreatorDetail({ type: "follow", value: false }));
      } else {
        data = await axios.post(
          `${API}/follow/${userId}`,
          {},
          { withCredentials: true }
        );
        dispatch(updateCreatorDetail({ type: "follow", value: true }));
      }
      toast.success(data.data.message || "following added", TOAST_CONFIG);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || err.message, TOAST_CONFIG);
    }
  };