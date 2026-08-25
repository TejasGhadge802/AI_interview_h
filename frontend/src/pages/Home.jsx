import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'motion/react'
import { useSelector } from 'react-redux'
import { BsRobot, BsMic, BsClock, BsBarChart, BsFileEarmarkText } from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'
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

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false)
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-[#f3f3f3] flex flex-col'>
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
                    console.log(userData)

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
              ${idx == 0 && "rotate-[-4deg]"}
              ${idx == 1 && "rotate-[3deg] md:mt-6 shadow-xl"}
              ${idx == 2 && "rotate-[-3deg]"}`}
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