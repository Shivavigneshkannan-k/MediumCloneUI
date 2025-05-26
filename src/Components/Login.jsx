import { useEffect, useReducer, useState } from "react";
import { API, initialState, reducer, SKY_IMAGE } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/user";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [form, dipatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(store => store.user);
  
  useEffect(()=>{
    if(user){
      navigate('/feed');
    }
  },[navigate,dipatch,user])

  const handleSubmit = async () => {
    try{
      let data = "";
      if(isLogin){
        data = await axios.post(API+"/login",{
          emailId: form.emailId.toLowerCase(),
          password: form.password
        },{withCredentials: true})
      }
      else{
       data =  await axios.post(API+"/signup",{
          emailId: form.emailId.toLowerCase(),
          password: form.password,
          username: form.userName
        },{withCredentials: true})
      }
      dispatch(addUser(data.data.data));
      navigate('/feed')
    }
    catch(err){
      console.log(err);
      dipatch({
          type: "UPDATE_FIELD",
          value:  err?.response?.data?.message || err?.message,
          field: "error"
        })
    }
    
    
  };
  const [isLogin,setLogin] = useState(true);
  const handleChange = (e) => {
    dipatch({
      type: "UPDATE_FIELD",
      value: e.target.value,
      field: e.target.name
    });
  };

  return (
    <div className='bg-blue-300 w-full h-dvh flex justify-center items-center  '>
      <div className='w-[50%] flex h-[60%] rounded-2xl justify-center shadow-xl'>
        <img
          src={SKY_IMAGE}
          alt='sky image'
          className='w-[45%] h-full rounded-l-2xl object-cover'
        />
        <div className='bg-gray-100 w-[55%] rounded-r-2xl flex flex-col justify-center'>
          <h1 className='text-center mt-5 text-2xl'>{isLogin ? "Login into account":"Create an account"}</h1>
          <div className='flex flex-col h-[80%] gap-3 items-center justify-center'>
            <input
              type='email'
              placeholder='Email Address'
              name='emailId'
              value={form.emailId}
              onChange={(e) => handleChange(e)}
              className='border border-gray-400 w-[70%] rounded-xl focus:outline-2 focus:border-0 focus:outline-blue-500 px-4 py-2'></input>
           {!isLogin &&  <input
              type='text'
              value={form.userName}
              name='userName'
              onChange={(e) => handleChange(e)}
              placeholder='Username'
              className='border border-gray-400 w-[70%] rounded-xl ffocus:outline-2 focus:border-0 focus:outline-blue-500 px-4 py-2'></input>}
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={form.password}
              onChange={(e) => handleChange(e)}
              className='border border-gray-400 w-[70%] rounded-xl focus:outline-2 focus:border-0 focus:outline-blue-500 px-4 py-2'></input>
            {form.error && <p className="text-red-600">Error: {form.error}</p>}
            <button
              className='py-2 px-2 bg-blue-500 w-[70%] rounded-2xl text-gray-50 mt-10 hover:bg-blue-700 '
              onClick={() => {
                handleSubmit();
              }}>
              {isLogin ?"LOGIN":"Sign Up"}
            </button>
          </div>
          <div className='mx-auto mb-5'>
            <span className='pr-2 text-center'>{isLogin?"Don't have an account?":"Have an account"}</span>
            <a className='text-center text-blue-500 hover:underline' onClick={()=>{
              setLogin(prev => !prev)
            }}>
              {isLogin ? "Register here":"Login here"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
