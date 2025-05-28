import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { API } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/user";

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const count = useRef(0);
  const [detail, setDetail] = useState({
    bio: "",
    interest: "",
    username: "",
    photo_url: ""
  })
  useEffect(() => {
    count.current += 1;
    console.log(count);

    setDetail((prev) => ({
      ...prev,
      ["bio"]: user?.about ||"",
      ["interest"]: user?.interest||"",
      ["username"]: user?.username || "",
      photo_url: user?.photo_url || ""
    }));
  }, [user]);
  const editProfile = async () => {
    const formData = new FormData();
    formData.append("userName",detail.username);
    formData.append("interest",detail.interest);
    formData.append("bio",detail.bio);
    if(detail.photo_url instanceof File){
      formData.append("image",detail.photo_url);
    }
    try {
      console.log(detail);
      const data = await axios.patch(
        API + "/edit/profile",
        formData,
        { withCredentials: true ,headers:{
          "Content-Type": "multipart/form-data"
        }}
      );
      dispatch(
        addUser(data.data.data)
      );
    } catch (err) {
      console.log(err);
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
      <div className='flex flex-col items-center '>
        <h1 className=' text-center text-4xl p-5 '>Edit Profile</h1>
        <div className='flex w-full justify-center mt-10'>
          <div className='w-1/2 flex flex-col items-center'>
            <div className='grid grid-cols-1 h-fit w-1/2 '>
              <div className=''>
                <label className='input validator'>
                  <svg
                    className='h-[1em] opacity-50'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'>
                    <g
                      strokeLinejoin='round'
                      strokeLinecap='round'
                      strokeWidth='2.5'
                      fill='none'
                      stroke='currentColor'>
                      <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'></path>
                      <circle
                        cx='12'
                        cy='7'
                        r='4'></circle>
                    </g>
                  </svg>
                  <input
                    type='text'
                    required
                    placeholder='Username'
                    value={detail.username}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name='username'
                  />
                </label>
              </div>

              <fieldset className='fieldset'>
                <legend className='fieldset-legend '>Interest</legend>
                <select
                  className='select'
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
              <div>
                <fieldset className='fieldset'>
                  <legend className='fieldset-legend'>Your bio</legend>
                  <textarea
                    className='textarea h-24'
                    placeholder='Bio'
                    value={detail.bio}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name='bio'></textarea>
                  <div className='label'>Optional</div>
                  <input
                    type='file'
                    className='file-input'
                    accept='image/*'
                    onChange={(e) => {
                      setDetail((prev) => ({
                        ...prev,
                        photo_url: e.target.files[0]
                      }));
                    }}
                  />
                </fieldset>
                <button
                  className='btn btn-info  items-center mt-4'
                  onClick={editProfile}>
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className='text-lg flex flex-col  w-1/2 gap-2 '>
            <img
              src={user?.photo_url}
              alt='user profile'
              className=' w-1/2'
            />
            <p>
              <span className='font-bold'>Name:</span> {user.username}
            </p>
            <p>
              <span className='font-bold'>Interest:</span> {user.interest}
            </p>
            <p>
              <span className='font-bold'>Bio: </span>
              {user.about}
            </p>
            <p>
              <span className='font-bold'>Email Id: </span>
              {user.email_id}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default EditProfile;
