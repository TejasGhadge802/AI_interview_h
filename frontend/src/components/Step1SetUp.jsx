import React, { useState } from 'react'
import {motion} from "motion/react"
import { FaUserTie, FaBriefcase, FaFileUpload, FaMicrophoneAlt, FaChartLine } from 'react-icons/fa'
import axios from "axios"
import { ServerUrl } from '../App'

const Step1SetUp = ({onStart}) => {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("Technical");

  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);


  const handleUploadResume = async () => {
    if(!resumeFile || analyzing) return;

      setAnalyzing(true)

      const formdata = new FormData()
      formdata.append("resume", resumeFile)
    try {
      const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, {withCredentials: true })

      console.log(result.data)

      setRole(result.data.role || "");
      setExperience(result.data.experience || "");
      setProjects(result.data.projects || []);
      setSkills(result.data.skills || []);
      setResumeText(result.data.resumeText || "");
      setAnalysisDone(true);
      setAnalyzing(false);
    } catch (err) {
      console.log("Handle Upload Resume Error: ",err)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: .6 }}
      className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4'>
        <div className='w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden'>

          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: .5 }}
            className='relative bg-gradient-to-br from-green-50 to-green-200 p-12 flex flex-col justify-center'>
              <h2 className='text-4xl font-bold text-gray-800 mb-6'>
                Start Your AI Interview
              </h2>
              <p className='text-gray-600 mb-10'>
                Practice real interview scenarios powered by AI.
                Improve Communication, technical skills, and confidence.
              </p>

              <div className='space-y-5'>
                {
                  [
                    {
                      icon: <FaUserTie className='text-green-600 text-xl' />,
                      text: "Choose Role & Experience",
                    },
                    {
                      icon: <FaMicrophoneAlt className='text-green-600 text-xl' />,
                      text: "Start Voice Interview",
                    },
                    {
                      icon: <FaChartLine className='text-green-600 text-xl' />,
                      text: "Performance Analytics",
                    },
                  ].map((item, idx)=>(
                    <motion.div key={idx}
                      initial={{y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 * idx *0.15 }}
                      whileHover={{ scale: 1.05 }}
                      className='flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm cursor-pointer'>
                        {item.icon}
                        <span className='text-gray-700 font-medium'>{item.text}</span>
                    </motion.div>
                  ))
                }
              </div>
          </motion.div>


          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: .5 }}
            className='p-12 bg-white'>
              <h2 className='text-3xl font-bold text-gray-800 mb-8'>
                Interview SetUp
              </h2>

              <div className='space-y-6'>
                <div className='relative '>
                  <FaUserTie className='absolute top-4 left-4 text-gray-400'/>
                  <input type='text' placeholder='Enter Role' className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition' onChange={(e)=>(setRole(e.target.value))} value={role} />
                </div>

                <div className='relative '>
                  <FaBriefcase className='absolute top-4 left-4 text-gray-400'/>
                  <input type='text' placeholder='Experience' className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition' onChange={(e)=>(setExperience(e.target.value))} value={experience} />
                </div>

                <select value={mode} className='w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition' onChange={(e)=>setMode(e.target.value)}>
                  <option value="Technical">Technical Interview</option>
                  <option value="HR">HR Interview</option>
                </select>


                {!analysisDone && (
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    onClick={()=>document.getElementById("resumeUpload").click()}
                    className='border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition'>
                    <FaFileUpload className='text-4xl mx-auto text-green-600 mb-3'/>
                    <input type='file' id="resumeUpload" accept='application/pdf' className='
                    hidden' onChange={(e)=>setResumeFile(e.target.files[0])} />
                    <p className='text-gray-600 font-medium'>
                      {resumeFile ? resumeFile.name : "Click to upload resume (Optional)"}
                    </p>

                    {resumeFile && (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        className='mt-4 bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition'
                        onClick={(e)=>{
                          e.stopPropagation()
                          handleUploadResume()
                        }}>
                        
                          {analyzing ? "Analyzing...": "Analyze Resume"}
                        </motion.button>
                    )}
                  </motion.div>
                )}

                {analysisDone && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className='bg-gray-50 border-gray-200 rounded-xl p-5 space-y-4'>
                      <h3 className='text-lg font-semibold text-gray-800'>
                        Resume Analysis Result

                        {projects.length > 0 && (
                          <div>
                            <p className='font-semibold text-gray-700 mb-5'>
                            Projects:</p>

                            <ul className='list-disc list-inside text-gray-600 space-y-1'>
                              {projects.map((pro, idx)=>(
                                <li key={idx}>{pro}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        

                        {skills.length > 0 && (
                          <div>
                            <p className='font-semibold text-gray-700 mb-1'>
                            Skills:</p>

                            <div className='flex flex-wrap gap-2'>
                              {skills.map((ski, idx)=>(
                                <span key={idx} className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm'>{ski}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </h3>
                  </motion.div>
                )}

                <motion.button
                  disabled={ !role || !experience }
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: .95 }}
                  className='w-full disabled:bg-gray-600 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md'>
                    Start Interview
                </motion.button>
              </div>
          </motion.div>
        </div>
    </motion.div>
  )
}

export default Step1SetUp