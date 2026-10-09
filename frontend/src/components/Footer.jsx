import React from 'react'
import Logo from './Logo'

const Footer = () => {
  return (
    <div className='bg-[#f8fafc] dark:bg-[#0f172a] flex justify-center px-4 pb-10 py-4 pt-10 transition-colors duration-200'>
        <div className='w-full max-w-6xl bg-white dark:bg-[#1e293b] rounded-[24px] shadow-sm dark:shadow-lg border border-slate-200 dark:border-slate-700/80 py-8 px-4 text-center text-slate-800 dark:text-white transition-colors duration-200'>
            <div className='flex justify-center items-center gap-3 mb-3'>
                <div className='bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 p-2 rounded-lg'>
                  <Logo size={18}/>
                </div>
                <h2 className='font-semibold text-lg text-slate-900 dark:text-white'>AI Interview</h2>
            </div>

            <p className='text-slate-600 dark:text-slate-300 text-sm max-w-xl mx-auto leading-relaxed'>
                AI-Powered Interview preparation platform designed to improve communication skills, technical depth and professional confidence.
            </p>
        </div>
    </div>
  )
}

export default Footer