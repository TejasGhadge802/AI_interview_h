import { React, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Auth from './pages/Auth'
import axios from 'axios'


export const ServerUrl = "http://localhost:8000"

const App = () => {

  useEffect(()=>{
    const getUser = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user", {withCredentials: true })
        console.log(result.data)
      } catch (err) {
        console.log("User Error", err)
      }
    }
  },[])

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/auth" element={<Auth/>} />
    </Routes>
  )
}

export default App