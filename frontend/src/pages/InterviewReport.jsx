import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import Step3Report from '../components/Step3Report'

const InterviewReport = () => {
  const { id } = useParams()
  const [ report, setReport ] = useState(null);

  useEffect(()=>{
    const fetchReport = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/interview/report/" + id, {withCredentials: true })

        console.log(result.data)

        setReport(result.data);
      } catch (err) {
        console.error(`Set Report Error: ${err}`)
      }
    }

    fetchReport()
  }, [id])

  if(!report){
    return(
      <div className='min-h-screen bg-[#0f172a] text-slate-100 flex items-center justify-center'>
        <p className='text-slate-300 text-lg'>Loading Report...</p>
      </div>
    )
  }

  return (
    <Step3Report report={report}/>
  )
}

export default InterviewReport