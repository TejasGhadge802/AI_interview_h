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
    <div className={`w-full ${isModel ? "py-4": "min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-800 dark:text-slate-100 flex items-center justify-center px-6 py-20 transition-colors duration-200"}`}>
        <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className={`w-full ${isModel ? "max-w-md p-8 rounded-3xl": "max-w-lg p-12 rounded-[32px]"} bg-white dark:bg-[#1e293b] text-slate-800 dark:text-white shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-700/80`}>
            <div className='flex items-center justify-center gap-3 mb-6'>
                <div className='bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 p-2 rounded-lg'>
                    <FaRobot size={18}/>
                </div>
                <h2 className='font-semibold text-lg text-slate-900 dark:text-white'>AI Interview</h2>
            </div>

            <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-5 text-slate-900 dark:text-white'>
                Continue with 
                <span className='bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30 px-6 py-2 rounded-full inline-flex items-center gap-2 mt-2'>
                    <FaWandMagicSparkles /> AI Interview
                </span>
            </h1>

            <p className='text-slate-600 dark:text-slate-300 text-center text-sm md:text-base leading-relaxed mb-8'>
                Sign in to start AI-Mock Interview
            </p>

            <motion.button
            onClick={ handleGoogleAuth }
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className='w-full flex items-center justify-center gap-2 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-full border border-slate-300 dark:border-slate-600 shadow-md cursor-pointer transition font-medium'
            >
                <span>Continue with</span>
                <FcGoogle size={24}/>
            </motion.button>
        </motion.div>
    </div>
  )
}

export default Auth