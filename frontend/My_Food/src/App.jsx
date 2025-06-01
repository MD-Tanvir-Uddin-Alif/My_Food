import {HashRouter, Routes, Route} from "react-router-dom"
import './index.css'
import NavBar from './assets/components/NavBar'
import Home from "./assets/components/Home"
import Register from "./assets/components/Register"

function App() {

  return (
    <div>
      <HashRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="login/" element={<Register/>}></Route>
      </Routes>
      </HashRouter>
    </div>
  )
}

export default App
