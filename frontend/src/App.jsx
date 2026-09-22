import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import AboutProject from './pages/AboutProject'
import { Route, Routes } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='/aboutproject' element={<AboutProject />} />
      </Routes>
    </>
  )
}

export default App
