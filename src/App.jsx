import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout";
import Feed from "./Components/Feed";
import Login from "./Components/Login";
import Post from "./Components/Post";
import ProfilePage from "./Components/ProfilePage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* protected routes */}
        <Route path="/" element={<Layout/>}>
        {/* unauthorized routes */}
          <Route path="/login" element={<Login/>}/>
            <Route index element={<Feed/>}/>
            <Route path='/feed' element={<Feed/>}/>
            <Route path='/post' element={<Post/>}/>
            <Route path='/profile/:userId' element={<ProfilePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
