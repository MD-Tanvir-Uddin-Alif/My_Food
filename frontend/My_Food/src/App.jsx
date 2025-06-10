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
import ManageComponent from "./assets/components/ManageCategory"
import ManageCategory from "./assets/components/ManageCategory"
import AdminLayout from "./assets/components/AdminLayout"
import { Toaster } from 'react-hot-toast';
import CreateCategory from "./assets/components/CreateCategory"


function App() {

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <HashRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="login/" element={<Login/>}></Route>
        <Route path="register/" element={<Register/>}></Route>
        <Route path="profile/" element={<PrivateRoute><Profile/></PrivateRoute>}></Route>
        <Route path="profile/update/" element={<PrivateRoute><UpdateProfile/></PrivateRoute>}></Route>
        <Route path="admin/" element={<PrivateRoute><AdminLayout/></PrivateRoute>}>
          <Route path="products/" element={<ManageProduct/>}></Route>
          <Route path="categorys/" element={<ManageCategory/>}></Route>
          <Route path="add-category/" element={<CreateCategory/>}></Route>
        </Route>
      </Routes>
      </HashRouter>
    </div>
  )
}

export default App
