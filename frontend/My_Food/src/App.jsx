import {HashRouter, Routes, Route} from "react-router-dom"
import './index.css'
import NavBar from './assets/components/NavBar'
import Home from "./assets/components/Home"
import Register from "./assets/components/Register"
import Login from "./assets/components/Login"
import PrivateRoute from "./utils/PrivateRoute"
import Profile from "./assets/components/Profile"
import UpdateProfile from "./assets/components/UpdateProfile"
import ManageProduct from "./assets/components/ManageProduct"

function App() {

  return (
    <div>
      <HashRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="login/" element={<Login/>}></Route>
        <Route path="register/" element={<Register/>}></Route>
        <Route path="profile/" element={<PrivateRoute><Profile/></PrivateRoute>}></Route>
        <Route path="profile/update/" element={<PrivateRoute><UpdateProfile/></PrivateRoute>}></Route>
        <Route path="manage/product/" element={<PrivateRoute><ManageProduct/></PrivateRoute>}></Route>
      </Routes>
      </HashRouter>
    </div>
  )
}

export default App
