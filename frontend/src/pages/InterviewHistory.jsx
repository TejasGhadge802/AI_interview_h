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
    <div className='min-h-screen bg-linear-to-br from-gray-50 to-emerald-50 py-10'>
        <div className='w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto'>

            <div className='mb-10 w-full flex items-start gap-4 flex-wrap'>
                <button onClick={() => navigate("/")}
                className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition'><FaArrowLeft className='text-gray-600' /></button>

                <div>
                    <h1 className='text-3xl font-bold text-gray-800'>
                        Interview History
                    </h1>

                    <p className='text-gray-500 mt-2'>
                        Review your past interviews and performance.
                    </p>
                </div>


            </div>


            { interviews.length === 0 ?
                <div className='bg-white p-10 rounded-2xl shadow text-center'>
                    <p className='text-gray-600'>
                        You haven't participated in any interviews yet. Start your first interview to see your history here!
                    </p>
                </div>
            :
                <div className='grid gap-6'>
                    {interviews.map((item) => (
                        <div key={item._id} 
                        onClick={()=>navigate(`/report/${item._id}`)}
                        className='bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100'>

                            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

                                <div className=''>
                                    <h3 className='text-lg font-semibold text-gray-800'>
                                        {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
                                    </h3>

                                    <p className='text-gray-500 text-sm mt-1'>
                                        {item.experience.charAt(0).toUpperCase() + item.experience.slice(1)} 
                                        ⚫ 
                                        {item.mode.charAt(0).toUpperCase() + item.mode.slice(1)}
                                    </p>

                                    <p className='text-sm text-gray-400 mt-2'>
                                        {
                                            new Date(item.createdAt).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })
                                        }
                                    </p>
                                </div>


                                <div className='flex items-center gap-6'>

                                    {/* SCORE */}
                                    <div className='text-right'>
                                        <p className='text-xl font-bold text-emerald-600'>
                                            {item.finalScore ?? 0}/10
                                        </p>

                                        <p className='text-xs text-gray-400'>
                                            Overall Score
                                        </p>
                                    </div>


                                    {/* STATUS BADGE */}
                                    <span 
                                        className={`px-4 py-1 rounded-full text-xs font-medium ${
                                            item.status?.toLowerCase() === "completed"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-yellow-100 text-yellow-700"
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