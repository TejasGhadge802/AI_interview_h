import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { BsJournalBookmark, BsArrowRight } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer className='bg-[#f8fafc] dark:bg-[#0f172a] flex justify-center px-4 pb-10 py-4 pt-10 transition-colors duration-200'>
        <div className='w-full max-w-6xl bg-white dark:bg-[#1e293b] rounded-3xl shadow-sm dark:shadow-lg border border-slate-200 dark:border-slate-700/80 p-8 sm:p-10 text-slate-800 dark:text-white transition-colors duration-200'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-100 dark:border-slate-700/60'>
              {/* Brand Col (5 cols) */}
              <div className='md:col-span-5 text-left'>
                <div className='flex items-center gap-3 mb-3'>
                    <div className='bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 p-2 rounded-lg'>
                      <Logo size={18}/>
                    </div>
                    <h2 className='font-bold text-lg text-slate-900 dark:text-white'>AI Interview</h2>
                </div>
                <p className='text-slate-600 dark:text-slate-300 text-sm max-w-sm leading-relaxed mb-4'>
                    AI-powered mock interview simulator and study library designed to help candidates practice speaking, sharpen technical depth, and land their dream jobs.
                </p>
                <div className='inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold'>
                  <span className='w-2 h-2 rounded-full bg-emerald-500 animate-ping'></span>
                  <span>Free & Open Preparation Guides</span>
                </div>
              </div>

              {/* Preparation Guides Links (4 cols) */}
              <div className='md:col-span-4 text-left'>
                <h3 className='text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-3.5 flex items-center gap-1.5'>
                  <BsJournalBookmark className='text-emerald-500' size={14} />
                  <span>Interview Preparation</span>
                </h3>
                <ul className='space-y-2 text-sm text-slate-600 dark:text-slate-300'>
                  <li>
                    <Link to="/preparation" className='inline-block py-1 hover:text-emerald-600 dark:hover:text-emerald-400 active:text-emerald-600 dark:active:text-emerald-400 active:translate-x-1 transition font-medium'>
                      Preparation Hub & All Guides
                    </Link>
                  </li>
                  <li>
                    <Link to="/preparation/javascript-interview-questions-freshers" className='inline-block py-1 hover:text-emerald-600 dark:hover:text-emerald-400 active:text-emerald-600 dark:active:text-emerald-400 active:translate-x-1 transition'>
                      JavaScript for Freshers
                    </Link>
                  </li>
                  <li>
                    <Link to="/preparation/hr-interview-questions-sample-answers" className='inline-block py-1 hover:text-emerald-600 dark:hover:text-emerald-400 active:text-emerald-600 dark:active:text-emerald-400 active:translate-x-1 transition'>
                      HR Behavioral Q&A Playbook
                    </Link>
                  </li>
                  <li>
                    <Link to="/preparation/react-interview-questions-answers" className='inline-block py-1 hover:text-emerald-600 dark:hover:text-emerald-400 active:text-emerald-600 dark:active:text-emerald-400 active:translate-x-1 transition'>
                      React Questions & Answers
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Platform Links (3 cols) */}
              <div className='md:col-span-3 text-left'>
                <h3 className='text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-3.5'>
                  Platform
                </h3>
                <ul className='space-y-2 text-sm text-slate-600 dark:text-slate-300'>
                  <li>
                    <Link to="/interview" className='inline-flex items-center gap-1 py-1 hover:text-emerald-600 dark:hover:text-emerald-400 active:text-emerald-600 dark:active:text-emerald-400 active:translate-x-1 transition font-medium'>
                      <span>Start Interview</span>
                      <BsArrowRight size={12} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className='inline-block py-1 hover:text-emerald-600 dark:hover:text-emerald-400 active:text-emerald-600 dark:active:text-emerald-400 active:translate-x-1 transition'>
                      Pricing & Credits
                    </Link>
                  </li>
                  <li>
                    <Link to="/history" className='inline-block py-1 hover:text-emerald-600 dark:hover:text-emerald-400 active:text-emerald-600 dark:active:text-emerald-400 active:translate-x-1 transition'>
                      Interview History
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Copyright */}
            <div className='pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2 text-center sm:text-left'>
              <p>© {new Date().getFullYear()} AI Interview Platform. All rights reserved.</p>
              <p>People-First Engineering & Career Preparation</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
