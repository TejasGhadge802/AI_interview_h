import React, { useState } from 'react'
import Step1SetUp from '../components/Step1SetUp'
import Step2Interview from '../components/Step2Interview'
import Step2VideoInterview from '../components/Step2VideoInterview'
import Step3Report from '../components/Step3Report'

const InterviewPage = () => {
  const [step, setStep] = useState(1)
  const [interviewData, setInterviewData] = useState(null)

  return (
    <div className='min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-800 dark:text-slate-100 transition-colors duration-200'>
        {step === 1 && (
            <Step1SetUp onStart={(data)=>{
                setInterviewData(data)
                setStep(2)
            }}/>
        )}

        {step === 2 && (
            interviewData?.interviewType === "video" ? (
              <Step2VideoInterview
                interviewData={interviewData}
                onFinish={(report)=>{
                    setInterviewData(report)
                    setStep(3)         
                }}
              />
            ) : (
              <Step2Interview
                interviewData={interviewData}
                onFinish={(report)=>{
                    setInterviewData(report)
                    setStep(3)         
                }}
              />
            )
        )}

        {step === 3 && (
            <Step3Report report={interviewData}/>
        )}
    </div>
  )
}

export default InterviewPage