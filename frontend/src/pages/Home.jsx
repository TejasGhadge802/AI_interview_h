import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'motion/react'
import { useSelector } from 'react-redux'
import { BsRobot, BsMic, BsClock, BsBarChart, BsFileEarmarkText, BsCameraVideo, BsShieldCheck } from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'
import { FaVideo } from 'react-icons/fa'
import { useState } from 'react' 
import { useNavigate } from 'react-router-dom'
import AuthModel from '../components/AuthModel'
{/* hr img */} import img1 from "../assets/img1.png"     
{/* tech img */} import img2 from "../assets/img2.png"     
{/* confidence img */} import img3 from "../assets/img3.png"     
{/* credit img */} import img4 from "../assets/img4.png"     
{/* eval img */} import img5 from "../assets/img5.png"     
{/* resume img */} import img6 from "../assets/img6.png"     
{/* pdf img */} import img7 from "../assets/img7.png"     
{/* analytic img */} import img8 from "../assets/img8.png"     
import img9 from "../assets/img9.png"
import img10 from "../assets/img10.png"
import Footer from '../components/Footer'
import { useTheme } from '../context/ThemeContext'

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const { isDark } = useTheme();
  const [showAuth, setShowAuth] = useState(false)
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-[#f3f3f3] dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300'>
      <Navbar/>

      <div className='flex-col px-6 py-20'>

        <div className='max-w-6xl mx-auto'>

        <div className='flex justify-center mb-6'>
          <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full flex iems-center gap-2">
          <HiSparkles className='bg-green-50 text-green-600' size={16}/>

            {`Practice Like It's the Real Interview`.split(" ").map((w, i) => (
              <motion.span 
              key={i}
              initial={{opacity: 0, x: -30}}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i*.10 }}
              className='font-semibold text-md md:text-lg'>{w}</motion.span>
            ))}
          </div>
        </div>

        <div className='text-center mb-28'>
          <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto'>
            Practice Interview with
            <span className='relative inline-block mt-5'>
              <span className='bg-green-100 text-green-600 px-5 py-1 rounded-full'>
                AI Intrviewer
              </span>
            </span>
          </motion.h1>

          <motion.p 
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, .3, 1] }}
          className='text-gray-500 mt-6 max-w-2xl mx-auto text-lg'>
            Your AI Interviwer is Ready. Are You?
          </motion.p>

          <div className='flex flex-wrap justify-center gap-4 mt-10'>
            <motion.button
            onClick={()=>{
                    // console.log(userData)

              if(!userData){
                setShowAuth(true)
                return
              }
              navigate("/interview")
            }}
            whileHover={{ scale: 1.10, opacity: .8 }}
            whileTap={{ scale: 0.8 }}
            className='bg-green-600 text-white px-10 py-3 rounded-full hover:bg-green-700 transition shadow-md'>
              Start Interview
            </motion.button>

            <motion.button
            onClick={()=>{
              if(!userData){
                setShowAuth(true)
                return
              }
              navigate("/history")
            }}
            whileHover={{ scale: 1.10, opacity: .8 }}
            whileTap={{ scale: 0.8 }}
            className='border  border-gray-300 px-10 py-3 rounded-full hover:bg-gray-100 transition'>
              History
            </motion.button>
          </div>

        </div>

        <div className='flex flex-col md:flex-row justify-center items-center gap-10 mb-28'>
          {
            [
              {
                icon: <BsRobot size={24}/>,
                step: "STEP: 1",
                title: "Role & Experience Selection",
                desc: "AI adjust difficulty based on selected job role.",
              },
              {
                icon: <BsMic size={24}/>,
                step: "STEP: 2",
                title: "Smart Voice Interview",
                desc: "Dynamic follow-up questions based on your answer.",
              },
              // {
              //   icon: <BsMic size={24}/>,
              //   step: "STEP: 2",
              //   title: "Smart Voice Interview",
              //   desc: "AI adjust difficulty based on selected job role",
              // },
              {
                icon: <BsClock size={24}/>,
                step: "STEP: 3",
                title: "Timer",
                desc: "Real interwiew pressure with time tracking.",
              },
            ].map((item, idx)=>(
              <motion.div key={idx}
              // initial={{ opacity: 0, y: 60 }}
              // transition={{ duration: .6 + idx * .2}}
              // whileHover={{ rotate: 0, scale: 1.06}}

              animate={
                idx == 0 || idx == 2?
                {y: [0, -15, 0]}:
                {y: [0, 15, 0]}
              }
              whileHover={{ rotate: 0, scale: 1.06 }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className={`relative bg-white rounded-3xl border-2 border-green-100 hover:border-green-400 p-10 w-80 max-w-[90%] shadow-md hover:shadow-[0_0_20px_rgba(74, 222, 128, .35)] transition-all
              ${idx === 0 ? "-rotate-1" : ""}
              ${idx === 1 ? "rotate-1 md:mt-6 shadow-xl" : ""}
              ${idx === 2 ? "-rotate-1" : ""}`}
              >
                <div className='absolute -top-8 left-1/2 -translate-x-1/2 bg-white border-2 border-green-500 text-green-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg'>
                  {item.icon}
                </div>
                <div className='pt-10 text-center'>
                  <div className='text-xs text-green-600 font-semibold mb-2 tracking-wider'>{item.step}</div>
                  <h3 className='font-semibold mb-3 text-lg'>{item.title}</h3>
                  <p className='text-sm text-gray-500 leading-relaxed'>{item.desc}</p>
                </div>
              </motion.div>
            ))
          }
        </div>

        {/* COMING SOON: VIDEO INTERVIEW FEATURE (Dynamic Theme) */}
        <div className='mb-32'>
          {isDark ? (
            /* DARK THEME VERSION */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 via-emerald-950 to-gray-900 text-white p-8 md:p-14 shadow-2xl border border-emerald-500/30'
            >
              <div className='absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none' />
              <div className='absolute -bottom-24 -left-24 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none' />

              <div className='relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12'>
                <div className='max-w-2xl'>
                  <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs md:text-sm font-semibold tracking-wide uppercase mb-6'>
                    <span className='w-2 h-2 rounded-full bg-emerald-400 animate-ping' />
                    Coming Soon
                  </div>

                  <h2 className='text-3xl md:text-5xl font-bold tracking-tight mb-5 leading-tight'>
                    AI Real-Time <span className='text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-200'>Video Interviews</span>
                  </h2>

                  <p className='text-gray-300 text-base md:text-lg leading-relaxed mb-8'>
                    Experience authentic face-to-face AI interviews with real-time camera tracking, facial expression analysis, eye contact metrics, and dynamic adaptive questioning.
                  </p>

                  <div className='grid sm:grid-cols-2 gap-4 text-sm text-gray-200'>
                    <div className='flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-xs'>
                      <div className='p-2 bg-emerald-500/20 text-emerald-400 rounded-lg'>
                        <BsCameraVideo size={18} />
                      </div>
                      <span>Face & Eye Contact Tracking</span>
                    </div>
                    <div className='flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-xs'>
                      <div className='p-2 bg-emerald-500/20 text-emerald-400 rounded-lg'>
                        <BsShieldCheck size={18} />
                      </div>
                      <span>Body Language & Confidence Score</span>
                    </div>
                  </div>
                </div>

                <div className='w-full lg:w-96 flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl text-center relative'>
                  <div className='relative w-20 h-20 rounded-2xl bg-linear-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg mb-4'>
                    <FaVideo className='text-white text-3xl' />
                    <span className='absolute -top-1 -right-1 flex h-4 w-4'>
                      <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75' />
                      <span className='relative inline-flex rounded-full h-4 w-4 bg-emerald-400' />
                    </span>
                  </div>

                  <h3 className='font-semibold text-lg text-white mb-1'>Interactive Video Mode</h3>
                  <p className='text-xs text-gray-400 mb-5'>Next-Gen AI proctored video sessions launching soon</p>

                  <div className='w-full py-2.5 px-4 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold tracking-wider uppercase'>
                    🚀 In Active Development
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* LIGHT THEME VERSION */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='relative overflow-hidden rounded-3xl bg-linear-to-br from-white via-emerald-50/50 to-teal-50/30 text-gray-800 p-8 md:p-14 shadow-lg hover:shadow-xl border-2 border-emerald-100 transition-all'
            >
              <div className='absolute -top-24 -right-24 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none' />
              <div className='absolute -bottom-24 -left-24 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl pointer-events-none' />

              <div className='relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12'>
                <div className='max-w-2xl'>
                  <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs md:text-sm font-semibold tracking-wide uppercase mb-6'>
                    <span className='w-2 h-2 rounded-full bg-emerald-500 animate-ping' />
                    Coming Soon
                  </div>

                  <h2 className='text-3xl md:text-5xl font-bold tracking-tight mb-5 leading-tight text-gray-900'>
                    AI Real-Time <span className='text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600'>Video Interviews</span>
                  </h2>

                  <p className='text-gray-600 text-base md:text-lg leading-relaxed mb-8'>
                    Experience authentic face-to-face AI interviews with real-time camera tracking, facial expression analysis, eye contact metrics, and dynamic adaptive questioning.
                  </p>

                  <div className='grid sm:grid-cols-2 gap-4 text-sm'>
                    <div className='flex items-center gap-3 bg-white border border-emerald-100 rounded-xl p-3.5 shadow-xs'>
                      <div className='p-2 bg-emerald-100 text-emerald-600 rounded-lg'>
                        <BsCameraVideo size={18} />
                      </div>
                      <span className='font-medium text-gray-700'>Face & Eye Contact Tracking</span>
                    </div>
                    <div className='flex items-center gap-3 bg-white border border-emerald-100 rounded-xl p-3.5 shadow-xs'>
                      <div className='p-2 bg-emerald-100 text-emerald-600 rounded-lg'>
                        <BsShieldCheck size={18} />
                      </div>
                      <span className='font-medium text-gray-700'>Body Language & Confidence Score</span>
                    </div>
                  </div>
                </div>

                <div className='w-full lg:w-96 flex flex-col items-center justify-center bg-white border border-emerald-100 rounded-2xl p-7 shadow-md text-center relative'>
                  <div className='relative w-20 h-20 rounded-2xl bg-linear-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4'>
                    <FaVideo className='text-white text-3xl' />
                    <span className='absolute -top-1 -right-1 flex h-4 w-4'>
                      <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
                      <span className='relative inline-flex rounded-full h-4 w-4 bg-emerald-500' />
                    </span>
                  </div>

                  <h3 className='font-semibold text-lg text-gray-900 mb-1'>Interactive Video Mode</h3>
                  <p className='text-xs text-gray-500 mb-5'>Next-Gen AI proctored video sessions launching soon</p>

                  <div className='w-full py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold tracking-wider uppercase'>
                    🚀 In Active Development
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>


        <div className='mb-32'>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .6 }}
            className='text-4xl font-semibold text-center mb-16'>
              Advance AI{" "}
              <span className='text-green-600'>Capabilities</span>
            </motion.h2>

            <div className='grid md:grid-cols-2 gap-10'>
              {
                [
                  {
                    img: img5,
                    icon: <BsBarChart size={20}/>,
                    title: "AI Answer Evalluation",
                    desc: "Scores Communication, Technical Accuracy and Confidence",
                  },
                  {
                    img: img6,
                    icon: <BsFileEarmarkText size={20}/>,
                    title: "Resume Based Interview",
                    desc: "Project-specific quesrions based on uploaded resume",
                  },
                  {
                    img: img7,
                    icon: <BsFileEarmarkText size={20}/>,
                    title: "Download PDF Report",
                    desc: "Detailed strengths, weakness and imporment insights",
                  },
                  {
                    img: img8,
                    icon: <BsBarChart size={20}/>,
                    title: "History & Analytics",
                    desc: "Track progress with performance graphs and topic analysis",
                  },
                ].map((item, idx)=>(
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: .1, delay: idx*.2 }}
                    whileHover={{ scale: 1.02 }}
                    key={idx} className='bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all'>
                      <div className='flex flex-col md:flex-row items-center gap-8'>
                        <div className='w-full md:w-1/2 flex justify-center'>
                          <img src={item.img} alt={item.title} className='w-full h-auto object-contain max-h-64'/>
                        </div>

                        <div className='w-full md:w-1/2 '>
                          <div className='bg-green-50 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6'>
                            {item.icon}
                          </div>
                          <h3 className='font-semibold mb-3 text-xl'>{item.title}</h3>
                          <p className='text-gray-500 text-sm leading-relaxed'>{item.desc}</p>
                        </div>
                      </div>
                  </motion.div>
                ))
              }
            </div>
        </div>

        <div className='mb-32'>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .6 }}
            className='text-4xl font-semibold text-center mb-16'>
              Multiple Interview{" "}
              <span className='text-green-600'>Modes</span>
            </motion.h2>

            <div className='grid md:grid-cols-2 gap-10'>
              {
                [
                  {
                    img: img1,
                    title: "HR Interview Mode",
                    desc: "Behavioral and communication based evalution",
                  },
                  {
                    img: img2,
                    title: "Technical Mode",
                    desc: "Deep technical questioning based on selected role",
                  },
                  {
                    img: img3,
                    title: "Confidence Delection",
                    desc: "Basic tone and voice analysis insights",
                  },
                  {
                    img: img4,
                    title: "Credits System",
                    desc: "Unlock premium interview session easily",
                  },
                ].map((item, idx)=>(
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: .1, delay: idx*.2 }}
                    whileHover={{ y: -10 }}
                    key={idx} className='bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all'>
                      <div className='flex items-center justify-between gap-6'>
                        <div className='w-1/2'>
                          <h3 className='font-semibold text-xl mb-3'>
                            {item.title}
                          </h3>
                          <p className='text-gray-500 text-sm leading-relaxed'>
                            {item.desc}
                          </p>
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className='w-1/2 flex justify-end'>
                          <img 
                            src={item.img}
                            alt={item.title}
                            className='w-28 h-28 object-contain'
                          />
                        </div>
                      </div>
                  </motion.div>
                ))
              }
            </div>
        </div>

        </div>
      </div>
      {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}

      <Footer/>
    </div>
  )
}


export default Home