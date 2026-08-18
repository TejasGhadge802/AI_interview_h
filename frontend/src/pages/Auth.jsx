import React from 'react'
import { FaRobot, FaWandMagicSparkles } from "react-icons/fa6"
import { FcGoogle } from "react-icons/fc"
import { motion } from "motion/react"
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utlis/firebase'
import axios from "axios"
import { ServerUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const Auth = ({isModel = false}) => {

    const dispatch = useDispatch()

    const handleGoogleAuth = async () => {
        try {
            const res = await signInWithPopup(auth, provider)

            let User = res.user
            let name = User.displayName
            let email = User.email
            const result = await axios.post(ServerUrl + "/api/auth/google", 
                { name, email }, { withCredentials: true })
            dispatch(setUserData(result.data))
        } catch (err) {
            dispatch(setUserData(null))
        }
    }


  return (
    <div className={`w-full ${isModel ? "py-4": "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}`}>
        <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className={`w-full ${isModel ? "max-w-md p-8 rounded-3xl": "max-w-lg p-12 rounded-[32px]"} bg-white shadow-2xl border border-gray-200`}>
            <div className='flex item-center justify-center gap-3 mb-6'>
                <div className='bg-black text-white p-2 rounded-lg'>
                    <FaRobot size={15}/>
                </div>
                <h2 className='font-semibold text-lg'>AI Interview</h2>
            </div>

            <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-5'>
                Continue with 
                <span className='bg-green-100 text-green-600 px-6 py-2 rounded-full inline-flex items-center gap-2 mt-2'>
                    <FaWandMagicSparkles /> AI Interview
                </span>
            </h1>

            <p className='text-gay-500 text-center etxt-sm md:text-base leading-relaxed mb-8'>
                Sign in to start AI-Mock Interview
            </p>

            <motion.button
            onClick={ handleGoogleAuth }
            whileHover={{ scale: 1.05, opacity: 0.9 }}
            whileTap={{ scale: 0.95 }}
            className='w-full flex items-center justify-center gap-1 py-3 bg-black text-white rounded-full shadow-md'
            >
                Continue with
                <FcGoogle size={25}/>
            </motion.button>
        </motion.div>
    </div>
  )
}

export default Auth