import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin } from "react-icons/bs"
import { HiOutlineLogout } from "react-icons/hi"
import { FaUserAstronaut } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ServerUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import AuthModel from './AuthModel'

const Navbar = () => {
    const { userData } = useSelector((state) => state.user)

    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const [showAuth, setShowAuth] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout", {withCredentials: true})
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="bg-[#0f172a] flex justify-center px-4 pt-6">
        <motion.div 
        initial={{opacity: 0, y:-50}}
        animate={{opacity: 1, y: 0}}
        transition={{duration:.3}}
        className='w-full max-w-6xl bg-[#1e293b] text-white rounded-[3xl] shadow-lg border border-slate-700/80 px-8 py-4 flex justify-between items-center relative'>
            <div onClick={()=>navigate("/")} className='flex items-center gap-3 cursor-pointer'>
                <div className='bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 p-2 rounded-lg'>
                    <BsRobot size={18}/>
                </div>
                <h1 className='font-semibold hidden md:block text-lg text-white'>AI Interview</h1>
            </div>

            <div className='flex items-center gap-6 relative'>
                <div className='relative'>
                    <button onClick={()=>{
                        if(!userData){
                            setShowAuth(true)
                            return
                        }
                        setShowCreditPopup(!showCreditPopup);
                        setShowUserPopup(false)
                    }}
                         className='flex items-center gap-2 bg-slate-700/80 hover:bg-slate-700 border border-slate-600 text-slate-200 px-4 py-2 rounded-full text-md transition shadow-xs cursor-pointer'>
                        <BsCoin size={20} className='text-amber-400'/> 
                        <span className='font-medium'>{userData?.credits || 0}</span>
                    </button>

                    {showCreditPopup && (
                        <div className='absolute -right-12.5 mt-3 w-64 bg-[#1e293b] text-white shadow-2xl border border-slate-700 rounded-xl p-5 z-98'>
                            <p className='text-sm text-slate-300 mb-4'>Wanna buy more credits to continue Interviews?</p>
                            <button onClick={()=>navigate("/pricing")} className='w-full bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-2 rounded-lg text-sm font-medium transition cursor-pointer'>Buy Credits</button>
                        </div>
                    )}
                </div>

                <div className='relative'>
                    <button onClick={()=>{
                        if(!userData){
                            setShowAuth(true)
                            return
                        }
                        setShowUserPopup(!showUserPopup);
                        setShowCreditPopup(false)
                    }}
                         className='w-9 h-9 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center font-semibold shadow-md transition cursor-pointer'>
                        { userData ? userData?.name.slice(0,1).toUpperCase(): <FaUserAstronaut size={18}/> }
                    </button>

                    {showUserPopup && (
                        <div className='absolute right-0 mt-3 w-48 bg-[#1e293b] text-white shadow-2xl border border-slate-700 rounded-xl p-4 z-98'>
                            <p className='text-md text-emerald-400 font-medium mb-1'>{userData?.name}</p>

                            <button onClick={()=>navigate("/history")} className='w-full text-left text-sm py-2 text-slate-300 hover:text-white transition cursor-pointer'>Interview History</button>

                            <button onClick={handleLogout}
                             className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-400 hover:text-red-300 transition cursor-pointer'> <HiOutlineLogout size={18}/>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>

        {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}
    </div>
  )
}

export default Navbar