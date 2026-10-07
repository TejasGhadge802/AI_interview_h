import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ServerUrl } from '../App'
import { FaArrowLeft } from 'react-icons/fa'

const InterviewHistory = () => {

    const [interviews, setInterviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getMyInterviews = async () => {
            try{
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })

                console.log(result.data);

                setInterviews(result.data.interviews);
            }catch(err){
                console.error(err);
            }
        }

        getMyInterviews();
    }, []);

  return (
    <div className='min-h-screen bg-[#0f172a] text-slate-100 py-10'>
        <div className='w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto'>

            <div className='mb-10 w-full flex items-start gap-4 flex-wrap'>
                <button onClick={() => navigate("/")}
                className='mt-1 p-3 rounded-full bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white transition shadow-sm cursor-pointer'><FaArrowLeft /></button>

                <div>
                    <h1 className='text-3xl font-bold text-white'>
                        Interview History
                    </h1>

                    <p className='text-slate-300 mt-2'>
                        Review your past interviews and performance.
                    </p>
                </div>


            </div>


            { interviews.length === 0 ?
                <div className='bg-[#1e293b] p-10 rounded-2xl border border-slate-700 shadow-lg text-center'>
                    <p className='text-slate-300'>
                        You haven't participated in any interviews yet. Start your first interview to see your history here!
                    </p>
                </div>
            :
                <div className='grid gap-6'>
                    {interviews.map((item) => (
                        <div key={item._id} 
                        onClick={()=>navigate(`/report/${item._id}`)}
                        className='bg-[#1e293b] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-700 hover:border-emerald-500/40'>

                            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

                                <div>
                                    <h3 className='text-lg font-semibold text-white'>
                                        {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
                                    </h3>

                                    <p className='text-slate-300 text-sm mt-1'>
                                        {item.experience.charAt(0).toUpperCase() + item.experience.slice(1)} 
                                        <span className="mx-3 text-slate-500">|</span>
                                        {item.mode.charAt(0).toUpperCase() + item.mode.slice(1)}
                                    </p>

                                    <p className='text-sm text-slate-400 mt-2'>
                                        {
                                            new Date(item.createdAt).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: false,
                                            })
                                        }
                                    </p>
                                </div>


                                <div className='flex items-center gap-6'>

                                    {/* SCORE */}
                                    <div className='text-right'>
                                        <p className='text-xl font-bold text-emerald-400'>
                                            {Number(item.finalScore) ?? 5}/10
                                        </p>

                                        <p className='text-xs text-slate-400'>
                                            Overall Score
                                        </p>
                                    </div>


                                    {/* STATUS BADGE */}
                                    <span 
                                        className={`px-4 py-1 rounded-full text-xs font-semibold ${
                                            item.status?.toLowerCase() === "completed"
                                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                        }`}
                                    >
                                        {
                                            item.status.charAt(0).toUpperCase() + item.status.slice(1)
                                        }
                                    </span>

                                </div>

                            </div>
                            
                        </div>
                    ))
                    }
                </div>
            }

        </div>


    </div>
  )
}

export default InterviewHistory