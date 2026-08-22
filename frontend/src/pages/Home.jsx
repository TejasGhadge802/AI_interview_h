import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'motion/react'
import { useSelector } from 'react-redux'
import { BsRobot, BsMic, BsClock, BsBarChart, BsFileEarmarkText } from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthModel from '../components/AuthModel'

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false)
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-[#f3f3f3] flex flex-col'>
      <Navbar/>

      <div className='flex-col px-6 py-20'>
        <div className='flex justify-center mb-6'>
          <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full flex iems-center gap-2">
          <HiSparkles className='bg-green-50 text-green-600' size={16}/>

            {`Practice Like It's the Real Interview`.split(" ").map((w, i) => (
              <motion.span 
              key={i}
              initial={{opacity: 0, x: -30}}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i*.10 }}
              className='font-semibold text-md md:text-lg'>{w}</motion.span>
            ))}
          </div>
        </div>

        <div className='text-center mb-28'>
          <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto'>
            Practice Interview with
            <span className='relative inline-block mt-5'>
              <span className='bg-green-100 text-green-600 px-5 py-1 rounded-full'>
                AI Intrviewer
              </span>
            </span>
          </motion.h1>

          <motion.p 
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, .3, 1] }}
          className='text-gray-500 mt-6 max-w-2xl mx-auto text-lg'>
            Your AI Interviwer is Ready. Are You?
          </motion.p>

          <div className='flex flex-wrap justify-center gap-4 mt-10'>
            <motion.button
            onClick={()=>{
                    console.log(userData)

              if(!userData){
                setShowAuth(true)
                return
              }
              navigate("/interview")
            }}
            whileHover={{ scale: 1.10, opacity: .8 }}
            whileTap={{ scale: 0.8 }}
            className='bg-green-600 text-white px-10 py-3 rounded-full hover:bg-green-700 transition shadow-md'>
              Start Interview
            </motion.button>

            <motion.button
            onClick={()=>{
              if(!userData){
                setShowAuth(true)
                return
              }
              navigate("/history")
            }}
            whileHover={{ scale: 1.10, opacity: .8 }}
            whileTap={{ scale: 0.8 }}
            className='border  border-gray-300 px-10 py-3 rounded-full hover:bg-gray-100 transition'>
              History
            </motion.button>
          </div>

        </div>
      </div>
      {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}
    </div>
  )
}


export default Home