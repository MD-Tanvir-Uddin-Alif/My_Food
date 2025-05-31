import { useState } from 'react'
import {HashRouter, Routes, Router} from 'react-router-dom'
import './index.css'
import NavBar from './assets/components/NavBar'

function App() {

  return (
    <div>
      <HashRouter>
      <NavBar/>

      <Routes>
      </Routes>

      </HashRouter>
    </div>
  )
}

export default App
