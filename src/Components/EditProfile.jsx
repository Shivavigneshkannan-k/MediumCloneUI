import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { API, TOAST_CONFIG } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/user";
import { Bounce, toast, ToastContainer } from "react-toastify";

const EditProfile = () => {
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
      <div className='flex flex-col-reverse lg:flex-row flex-grow  min-h-[100%] font-serif lg:justify-end  '>
        <ToastContainer className='mt-[5%]' />
        <div className='mx-auto flex flex-col lg:gap-4 items-center lg:border-r-2 border-slate-200 lg:m-4 lg:p-5 lg:items-start lg:w-full '>
          <input
            type='text'
            required
            placeholder='Username'
            value={detail.username}
            onChange={(e) => {
              handleChange(e);
            }}
            name='username'
            className='focus:outline-0 bg-slate-100 px-6 py-3 lg:w-2/5 w-[80%] ml-'
          />

          <fieldset className='fieldset w-[80%] lg:w-full'>
            <legend className='text-lg py-2'>Interest</legend>
            <select
              className='lg:w-2/5 w-full px-6 py-3 border-0 focus:outline-0 bg-slate-100 text-md'
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
          <fieldset className='fieldset w-[80%] lg:w-full'>
            <legend className='text-lg py-2'>Short bio</legend>
            <textarea
              className='lg:w-2/5 w-full px-6 py-3 border-0 focus:outline-0 bg-slate-100 lg:h-40 text-lg lg:py-2'
              placeholder='Bio'
              value={detail.bio}
              onChange={(e) => {
                handleChange(e);
              }}
              name='bio'></textarea>
            <div className='label'>Optional</div>
          </fieldset>
          <div className='lg:w-2/5 md:w-1/2 w-[80%]'>
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
