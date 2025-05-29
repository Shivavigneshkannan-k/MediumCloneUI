import { useEffect, useReducer, useState } from "react";
import { API, initialState, reducer, SKY_IMAGE } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/user";
import { useLocation, useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
const Login = () => {
  const [form, dipatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const from = location?.state?.from?.pathname || "/feed";
      navigate(from, { replace: true });
    }
  }, [user, location, navigate]);

  const handleSubmit = async () => {
    try {
      let data = "";
      if (isLogin) {
        data = await axios.post(
          API + "/login",
          {
            emailId: form.emailId.toLowerCase(),
            password: form.password
          },
          { withCredentials: true }
        );
      } else {
        data = await axios.post(
          API + "/signup",
          {
            emailId: form.emailId.toLowerCase(),
            password: form.password,
            username: form.userName
          },
          { withCredentials: true }
        );
      }
      dispatch(addUser(data.data.data));
      navigate("/feed");
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce
      });
    }
  };
  const [isLogin, setLogin] = useState(true);
  const handleChange = (e) => {
    dipatch({
      type: "UPDATE_FIELD",
      value: e.target.value,
      field: e.target.name
    });
  };

  return (
    <div className='bg-slate-200 w-full h-dvh flex justify-center items-center font-serif '>
      <div className='lg:w-1/3 lg:h-2/3 rounded-xl p-4 bg-white shadow-xl flex flex-col '>
        <h1 className='text-center my-5 text-3xl'>
          {isLogin ? "Login into account" : "Create an account"}
        </h1>
        <div className='lg:max-h-1/2 mx-4 p-4 flex flex-col flex-grow items-center pt-[15%] space-y-5 '>
          <input
            type='email'
            placeholder='Email Address'
            name='emailId'
            value={form.emailId}
            onChange={(e) => handleChange(e)}
            className='lg:w-3/4 px-4 py-2 rounded-lg focus:outline-blue-400 focus:outline-2 outline-1 outline-gray-400'></input>
          {!isLogin && (
            <input
              type='text'
              value={form.userName}
              name='userName'
              onChange={(e) => handleChange(e)}
              placeholder='Username'
              className='lg:w-3/4 px-4 py-2 rounded-lg focus:outline-blue-400 focus:outline-2 outline-1 outline-gray-400 '></input>
          )}
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={form.password}
            onChange={(e) => handleChange(e)}
            className='lg:w-3/4 px-4 py-2 rounded-lg focus:outline-blue-400 focus:outline-2 outline-1 outline-gray-400'></input>
        </div>
        <div className='mx-6 flex flex-col justify-center flex-grow'>
          <button
            className='w-3/4 bg-blue-400 px-4 py-2 rounded-lg
              text-white hover:shadow-sm hover:bg-blue-500 
              transition hover:scale-[102%] hover:ease-in hover:1s mx-auto '
            onClick={() => {
              handleSubmit();
            }}>
            {isLogin ? "LOGIN" : "SIGN UP"}
          </button>
          <ToastContainer className="mt-[5%]"/>
          <div className='m-auto text-center '>
            <span className='pr-2 text-center'>
              {isLogin ? "Don't have an account?" : "Have an account"}
            </span>
            <a
              className='text-center text-blue-500 hover:underline'
              onClick={() => {
                setLogin((prev) => !prev);
              }}>
              {isLogin ? "Register here" : "Login here"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
