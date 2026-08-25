import React from 'react'
import { BsRobot } from 'react-icons/bs'

const Footer = () => {
  return (
    <div className='bg-[#f3f3f3] flex justify-center px-4 pb-10 py-4 pt-10'>
        <div className='w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 py-8 px-3 text-center'>
            <div className='flex justify-center items-center gap-3 mb-3'>
                <div className='bg-black text-white p-2 rounded-lg'><BsRobot size={16}/></div>
                <h2 className='font-semibold'>AI Interview</h2>
            </div>

            <p className='text-gray-500 text-sm max-w-xl mx-auto'>
                AI-Powered Interview preparation platform designed to imporve communication skills, technical depth and proffessionl confidence.
            </p>
        </div>
    </div>
  )
}

export default Footer