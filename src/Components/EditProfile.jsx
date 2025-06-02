import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { API, TOAST_CONFIG } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/user";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const EditProfile = ({ setShowEdit }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const count = useRef(0);
  const [detail, setDetail] = useState({
    bio: "",
    interest: "",
    username: "",
    photo_url: ""
  });
  useEffect(() => {
    count.current += 1;
    console.log(count);

    setDetail((prev) => ({
      ...prev,
      ["bio"]: user?.about || "",
      ["interest"]: user?.interest || "",
      ["username"]: user?.username || "",
      ["photo_url"]: user?.photo_url || ""
    }));
  }, [user]);
  const editProfile = async () => {
    const formData = new FormData();
    formData.append("userName", detail.username);
    formData.append("interest", detail.interest);
    formData.append("bio", detail.bio);
    if (detail.photo_url instanceof File) {
      formData.append("image", detail.photo_url);
    }

    try {
      const data = await axios.patch(API + "/edit/profile", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      dispatch(addUser(data.data.data));
      toast.success("profile updated successfully!!!", TOAST_CONFIG);
      setTimeout(() => {
        setShowEdit(false);
      }, 3000);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message, TOAST_CONFIG);
    }
  };
  const handleChange = (e) => {
    setDetail((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    user && (
      <div className='w-full h-dvh flex justify-center bg-slate-300 fixed'>
        <ToastContainer className='mt-[5%]' />
        <div className='lg:w-1/3 md:w-1/2 w-[95%] mt-10 shadow-xl p-4 rounded-lg h-fit bg-white'>
          <div className='w-full flex justify-end m-2'>
            <FontAwesomeIcon
              icon={faXmark}
              size='lg'
              className='hover:bg-red-500 hover:text-white py-2 px-3  rounded-full'
              onClick={() => {
                setShowEdit((prev) => !prev);
              }}
            />
          </div>
          <input
            type='text'
            required
            placeholder='Username'
            value={detail.username}
            onChange={(e) => {
              handleChange(e);
            }}
            name='username'
            className='focus:outline-0 bg-slate-100 px-6 py-3 w-full'
          />

          <fieldset className='fieldset w-full'>
            <legend className='text-lg py-2'>Interest</legend>
            <select
              className=' w-full px-6 py-3 border-0 focus:outline-0 bg-slate-100 text-md'
              value={detail.interest}
              onChange={(e) => {
                handleChange(e);
              }}
              name='interest'>
              <option value={""}>Pick a interest</option>
              <option value={"web development"}>web development</option>
              <option value={"social"}>Social</option>
              <option value={"nature"}>Nature</option>
              <option value={"technology"}>Technology</option>
            </select>
            <span className='label'>Optional</span>
          </fieldset>
          <fieldset className='fieldset w-full'>
            <legend className='text-lg py-2'>Short bio</legend>
            <textarea
              className='w-full px-6 py-3 border-0 focus:outline-0 bg-slate-100 lg:h-40 text-lg lg:py-2'
              placeholder='Bio'
              value={detail.bio}
              onChange={(e) => {
                handleChange(e);
              }}
              name='bio'></textarea>
            <div className='label'>Optional</div>
          </fieldset>
          <div className='w-full'>
            <input
              type='file'
              className='file-input w-full'
              accept='image/*'
              onChange={(e) => {
                setDetail((prev) => ({
                  ...prev,
                  photo_url: e.target.files[0]
                }));
              }}
            />
          </div>
          <button
            className='btn btn-info items-center mt-4'
            onClick={editProfile}>
            Save
          </button>
        </div>
      </div>
    )
  );
};

export default EditProfile;
