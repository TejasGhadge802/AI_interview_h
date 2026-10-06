import React from 'react'
import { BsRobot } from 'react-icons/bs'

const Footer = () => {
  return (
    <div className='bg-[#0f172a] flex justify-center px-4 pb-10 py-4 pt-10'>
        <div className='w-full max-w-6xl bg-[#1e293b] rounded-[24px] shadow-lg border border-slate-700/80 py-8 px-4 text-center text-white'>
            <div className='flex justify-center items-center gap-3 mb-3'>
                <div className='bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 p-2 rounded-lg'>
                  <BsRobot size={16}/>
                </div>
                <h2 className='font-semibold text-lg text-white'>AI Interview</h2>
            </div>

            <p className='text-slate-300 text-sm max-w-xl mx-auto leading-relaxed'>
                AI-Powered Interview preparation platform designed to improve communication skills, technical depth and professional confidence.
            </p>
        </div>
    </div>
  )
}

export default Footer