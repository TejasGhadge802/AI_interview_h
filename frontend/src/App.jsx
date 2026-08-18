// import { React, useEffect } from 'react'
// import { Routes, Route } from 'react-router-dom'

// import Home from './pages/Home'
// import Auth from './pages/Auth'
// import axios from 'axios'
// import { useDispatch } from 'react-redux'
// import { setUserData } from './redux/userSlice'


// export const ServerUrl = "http://localhost:8000"

// const App = () => {

//   const dispatch = useDispatch()

//   useEffect(()=>{
//     const getUser = async () => {
//       try {
//         const result = await axios.get(ServerUrl + "/api/user/current-user", {withCredentials: true })
// <<<<<<< HEAD
//         console.log(result.data)
//       } catch (error) {
//         console.log("User Error", error)
// =======
//         dispatch(setUserData(result.data))
//       } catch (err) {
//         dispatch(setUserData(null))
// >>>>>>> 688face (debug the logout function & add the basic home and navbar)
//       }
//     }
//     getUser()
//   },[dispatch])

//   return (
//     <Routes>
//       <Route path="/" element={<Home/>} />
//       <Route path="/auth" element={<Auth/>} />
//     </Routes>
//   )
// }

// export default App















import { React, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Auth from './pages/Auth'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'

export const ServerUrl = "http://localhost:8000"

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(
          ServerUrl + "/api/user/current-user",
          { withCredentials: true }
        )

        dispatch(setUserData(result.data))
      } catch (err) {
        dispatch(setUserData(null))
      }
    }

    getUser()
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  )
}

export default App