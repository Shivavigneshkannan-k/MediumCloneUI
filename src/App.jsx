import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout";
import Feed from "./Components/Feed";
import Login from "./Components/Login";
import Post from "./Components/Post";
import EditProfile from "./Components/EditProfile";
import { useSelector } from "react-redux";
const App = () => {
const user = useSelector(store=>store.user);
  return (
    <BrowserRouter>
      <Routes>
        {/* unauthorized routes */}
        <Route path="/login" element={<Login/>}/>

        {/* protected routes */}
        <Route path="/" element={<Layout/>}>
            <Route index element={<Feed/>}/>
            <Route path='/feed' element={<Feed/>}/>
            <Route path='/post' element={<Post/>}/>
            <Route path='/profile' element={<EditProfile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
