import { BrowserRouter,Routes,Route } from "react-router-dom"
import Layout from "./Components/Layout"
import Feed from "./Components/Feed"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
const App=()=> {

  return (
    <div>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>} >
            <Route index element={<Login/>}/>
            <Route  path="/feed" element={<Feed/>}/>
          </Route>
        </Routes>
      </BrowserRouter> */}
      <Profile/>
    </div>
  )
}

export default App
