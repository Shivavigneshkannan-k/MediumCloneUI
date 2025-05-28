import { BrowserRouter,Routes,Route } from "react-router-dom"
import Layout from "./Components/Layout"
import Feed from "./Components/Feed"
import Login from "./Components/Login"
import Post from "./Components/Post"
import { Provider } from "react-redux"
import appStore from "./store/appStore"
import EditProfile from "./Components/EditProfile"
const App=()=> {

  return (
    <div>
      <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>} >
          <Route index element={<Login/>}/>
            <Route  path="feed" element={<Feed/>}/>
            <Route  path="post" element={<Post />}/>
            <Route  path="profile" element={<EditProfile />}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
