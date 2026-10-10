import React, { useState } from 'react'
import {motion} from "motion/react"
import { FaUserTie, FaBriefcase, FaFileUpload, FaMicrophoneAlt, FaChartLine, FaVideo } from 'react-icons/fa'
import axios from "axios"
import { ServerUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const Step1SetUp = ({onStart}) => {
  const {userData} = useSelector((state)=>state.user)
  const dispatch = useDispatch()

  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("Technical");
  const [interviewType, setInterviewType] = useState("audio");

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
      setAnalyzing(false);
    }
  }


  const handleStart = async (params) => {
    setLoading(true)
    try {
      const result = await axios.post(ServerUrl + "/api/interview/generate-questions", {role, experience, mode, resumeText, projects, skills}, {withCredentials: true})

      if(userData){
        dispatch(setUserData({...userData, credits: result.data.creditsLeft}))
      }
      setLoading(false)

      onStart({ ...result.data, interviewType })
    } catch (err) {
      console.error(`Handel Start Error: ${err}`)
      setLoading(false)
    }
  }


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: .6 }}
      className='min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#0f172a] text-slate-800 dark:text-slate-100 px-4 py-8 transition-colors duration-200'>
        <div className='w-full max-w-6xl bg-white dark:bg-[#1e293b] rounded-3xl shadow-xl dark:shadow-2xl grid md:grid-cols-2 overflow-hidden border border-slate-200 dark:border-slate-700/80 transition-colors duration-200'>

          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: .5 }}
            className='relative bg-linear-to-br from-emerald-50/60 via-teal-50/30 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700/80'>
              <h2 className='text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6'>
                Start Your AI Interview
              </h2>
              <p className='text-slate-600 dark:text-slate-300 mb-10 text-base leading-relaxed'>
                Practice real interview scenarios powered by AI.
                Improve Communication, technical skills, and confidence.
              </p>

              <div className='space-y-5'>
                {
                  [
                    {
                      icon: <FaUserTie className='text-emerald-600 dark:text-emerald-400 text-xl' />,
                      text: "Choose Role & Experience",
                    },
                    {
                      icon: <FaVideo className='text-emerald-600 dark:text-emerald-400 text-xl' />,
                      text: "Audio or Audio & Video Mode",
                    },
                    {
                      icon: <FaChartLine className='text-emerald-600 dark:text-emerald-400 text-xl' />,
                      text: "Performance Analytics",
                    },
                  ].map((item, idx)=>(
                    <motion.div key={idx}
                      initial={{y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 * idx *0.15 }}
                      whileHover={{ scale: 1.03 }}
                      className='flex items-center space-x-4 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-xs cursor-pointer'>
                        {item.icon}
                        <span className='text-slate-800 dark:text-slate-200 font-medium'>{item.text}</span>
                    </motion.div>
                  ))
                }
              </div>
          </motion.div>


          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: .5 }}
            className='p-8 md:p-12 bg-white dark:bg-[#1e293b]'>
              <h2 className='text-3xl font-bold text-slate-900 dark:text-white mb-8'>
                Interview SetUp
              </h2>

              <div className='space-y-6'>
                <div className='relative'>
                  <FaUserTie className='absolute top-4 left-4 text-slate-400'/>
                  <input type='text' placeholder='Enter Role' className='w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition' onChange={(e)=>(setRole(e.target.value))} value={role} />
                </div>

                <div className='relative'>
                  <FaBriefcase className='absolute top-4 left-4 text-slate-400'/>
                  <input type='text' placeholder='Experience' className='w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition' onChange={(e)=>(setExperience(e.target.value))} value={experience} />
                </div>

                <select value={mode} className='w-full py-3 px-4 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition cursor-pointer' onChange={(e)=>setMode(e.target.value)}>
                  <option className='bg-white dark:bg-slate-900 text-slate-800 dark:text-white' value="Technical">Technical Interview</option>
                  <option className='bg-white dark:bg-slate-900 text-slate-800 dark:text-white' value="HR">HR Interview</option>
                </select>

                {/* Interview Format Selector: Audio vs Audio & Video */}
                <div>
                  <label className='block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5'>
                    Select Interview Format
                  </label>
                  <div className='grid grid-cols-2 gap-3'>
                    <div
                      onClick={() => setInterviewType("audio")}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-1.5 ${
                        interviewType === "audio"
                          ? "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-500/15 shadow-sm shadow-emerald-500/10"
                          : "border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-600"
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl transition-colors ${
                        interviewType === "audio" 
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30" 
                          : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}>
                        <FaMicrophoneAlt size={18} />
                      </div>
                      <span className='font-semibold text-sm text-slate-900 dark:text-white'>Audio Only</span>
                      <span className='text-[11px] text-slate-500 dark:text-slate-400 leading-tight'>Voice Interview</span>
                    </div>

                    <div
                      onClick={() => setInterviewType("video")}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-1.5 relative overflow-hidden ${
                        interviewType === "video"
                          ? "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-500/15 shadow-sm shadow-emerald-500/10"
                          : "border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-600"
                      }`}
                    >
                      <span className='absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-500 text-white shadow-xs'>
                        Live
                      </span>
                      <div className={`p-2.5 rounded-xl transition-colors ${
                        interviewType === "video" 
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30" 
                          : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}>
                        <FaVideo size={18} />
                      </div>
                      <span className='font-semibold text-sm text-slate-900 dark:text-white'>Audio & Video</span>
                      <span className='text-[11px] text-slate-500 dark:text-slate-400 leading-tight'>Webcam + AI Tracking</span>
                    </div>
                  </div>
                </div>


                {!analysisDone && (
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    onClick={()=>document.getElementById("resumeUpload").click()}
                    className='border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-slate-900/50 transition'>
                    <FaFileUpload className='text-4xl mx-auto text-emerald-600 dark:text-emerald-400 mb-3'/>
                    <input type='file' id="resumeUpload" accept='application/pdf' className='hidden' onChange={(e)=>setResumeFile(e.target.files[0])} />
                    <p className='text-slate-600 dark:text-slate-300 font-medium'>
                      {resumeFile ? resumeFile.name : "Click to upload resume (Optional)"}
                    </p>

                    {resumeFile && (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        className='mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-5 py-2 rounded-lg transition shadow-md cursor-pointer'
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
                    className='bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-4'>
                      <h3 className='text-lg font-semibold text-slate-900 dark:text-white'>
                        Resume Analysis Result
                      </h3>

                      {projects.length > 0 && (
                        <div>
                          <p className='font-semibold text-slate-700 dark:text-slate-200 mb-2'>
                            Projects:
                          </p>

                          <ul className='list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1 text-sm'>
                            {projects.map((pro, idx)=>(
                              <li key={idx}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {skills.length > 0 && (
                        <div>
                          <p className='font-semibold text-slate-700 dark:text-slate-200 mb-2'>
                            Skills:
                          </p>

                          <div className='flex flex-wrap gap-2'>
                            {skills.map((ski, idx)=>(
                              <span key={idx} className='bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 px-3 py-1 rounded-full text-sm font-medium'>{ski}</span>
                            ))}
                          </div>
                        </div>
                      )}
                  </motion.div>
                )}

                <motion.button
                  onClick={handleStart}
                  disabled={ !role || !experience || loading }
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: .96 }}
                  className='w-full disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 rounded-full text-lg font-semibold transition duration-300 shadow-lg shadow-emerald-600/20 dark:shadow-emerald-950/50 cursor-pointer'>
                    {loading ? "Starting..." : "Start Interview"}
                </motion.button>
              </div>
          </motion.div>
        </div>
    </motion.div>
  )
}

export default Step1SetUp