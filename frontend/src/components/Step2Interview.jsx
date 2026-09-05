import React, { useState } from 'react'
import maleVideo from "../assets/videos/male.mp4"
import femaleVideo from "../assets/videos/female.mp4"
import Timer from './Timer'


const Step2Interview = ({interviewData, onFinish}) => {

  const {interviewId, questions, userName} = interviewData

    
  return (
    <div className='min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-4 sm:p-6'>
      <div className='w-full max-w-350 min-h-[80vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden'>

        {/* Video section */}
        <div className='w-full lg:w-[35%] bg-white flex flex-col items-center p-6 space-y-6 border-r border-gray-200'>
            <div className='w-full max-w-md rounded-2xl overflow-hidden shadow-xl'>
              <video 
                src={femaleVideo} 
                muted
                playsInline
                preload='auto'
                className='w-full h-auto object-cover'
              />
            </div>

            {/* SUBTITLE */}



            {/* TIMER */}
            <div className='w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-5'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-500'>Interview Status</span>
                <span className='text-sm font-semibold text-emerald-600'>AI Speaking</span>
              </div>

              <div className='h-px bg-gray-200'></div>


              <div className='flex justify-center'>
                <Timer timeLeft="46" totalTime="60"/>
              </div>

              <div className='h-px bg-gray-200'></div>

              <div className='grid grid-cols-2 gap-6 text-center'>
                <div>
                  <span className='text-2xl font-bold text-emerald-600 mr-1'>1</span>
                  <span className='text-xs text-gray-400'>This is Question</span>
                </div>

                <div>
                  <span className='text-2xl font-bold text-emerald-600 mr-1'>5</span>
                  <span className='text-xs text-gray-400'>Total Question</span>
                </div>
              </div>


            </div>
        </div>


        {/* TEXT SECTION */}
        <div className='flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative'>
          <h2 className='text-xl sm:text-2xl font-bold text-emerald-600 mb-6'>
            AI Interview
          </h2>

          <div className='relative mb-6 bg-gray-50 p-4 sm:p-6 roundeed-2xl border border-gray-200 shadow-sm'>
            <p className='text-xs sm:text-sm text-gray-400  mb-2'>Quetion 1 of 5</p>

            <div className='text-base sm:text-lg font-semibold text-greay-800 leading-relaxed'>This is Question</div>
          </div>

        </div>


      </div>
    </div>
  )
}

export default Step2Interview