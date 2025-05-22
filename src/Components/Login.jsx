import {SKY_IMAGE} from "../utils/constants"
const Login = () => {
  return (
    <div className="bg-blue-300 w-full h-dvh flex justify-center items-center  ">
      <div className="w-[50%] flex h-[60%] rounded-2xl justify-center shadow-xl">
        <img src={SKY_IMAGE} alt="sky image" className="w-[45%] h-full rounded-l-2xl object-cover"/>
        <div className="bg-gray-100 w-[55%] rounded-r-2xl flex flex-col justify-center">
            <h1 className="text-center mt-5 text-2xl">Login into account</h1>
            <div className="flex flex-col h-[80%] gap-3 items-center justify-center">
                <input type="email" placeholder="Email Address" className="border border-gray-400 w-[70%] rounded-xl focus:outline-2 focus:border-0 focus:outline-blue-500 px-4 py-2"></input>
                <input type="password" placeholder="Password" className="border border-gray-400 w-[70%] rounded-xl ffocus:outline-2 focus:border-0 focus:outline-blue-500 px-4 py-2"></input>
                <input type="password" placeholder="Confirm Password" className="border border-gray-400 w-[70%] rounded-xl focus:outline-2 focus:border-0 focus:outline-blue-500 px-4 py-2"></input>
                <button className="py-2 px-2 bg-blue-500 w-[70%] rounded-2xl text-gray-50 mt-10 hover:bg-blue-700 ">LOGIN</button>
            </div>
            <div className="mx-auto mb-5">
                <span className="pr-2 text-center">Don't have an account?</span>
                <a className="text-center text-blue-500 hover:underline">Register here</a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
