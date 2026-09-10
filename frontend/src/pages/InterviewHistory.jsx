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

                setInterviews(result.data);
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
                    <h1 className='text-3xl font-bold text-gray-800 flex-nowrap'>
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
                    {interviews.map((item, index) => (
                        <div key={index} className='bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100'>
                            
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