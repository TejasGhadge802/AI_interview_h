import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { motion, AnimatePresence } from 'motion/react'
import { useSelector } from 'react-redux'
import { 
  BsMic, 
  BsClock, 
  BsBarChart, 
  BsFileEarmarkText, 
  BsCameraVideo, 
  BsShieldCheck, 
  BsChevronDown, 
  BsCheckCircleFill, 
  BsLightningCharge, 
  BsQuestionCircle,
  BsLightbulb,
  BsArrowRight,
  BsAward,
  BsGraphUpArrow,
  BsPersonWorkspace
} from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'
import { FaVideo, FaCode, FaUserTie, FaRegComments, FaRobot } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import AuthModel from '../components/AuthModel'
import Logo from '../components/Logo'
import { useTheme } from '../context/ThemeContext'
import img1 from "../assets/img1.jpg"     
import img2 from "../assets/img2.jpg"     
import img3 from "../assets/img3.jpg"     
import img4 from "../assets/img4.jpg"     
import img5 from "../assets/img5.jpg"     
import img6 from "../assets/img6.jpg"     
import img7 from "../assets/img7.jpg"     
import img8 from "../assets/img8.jpg"     
import Footer from '../components/Footer'

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false)
  const navigate = useNavigate()
  const { isDark } = useTheme()

  // State for interactive Sample Questions section
  const [sampleTab, setSampleTab] = useState('hr')
  const [openSampleIndex, setOpenSampleIndex] = useState(0)

  // State for interactive FAQ accordion
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  // Sample questions data categorized by role / interview type
  const sampleQuestionsData = {
    hr: [
      {
        question: "Tell me about a time you handled a tight deadline or conflicting priorities.",
        idealAnswer: "In my previous project, we had two critical client deliverables due the same week when a core team member fell ill. I assessed both scopes, reprioritized backlog tickets using an impact-versus-urgency matrix, and communicated proactively with the stakeholders to shift a non-critical feature by three days. By focusing on core functionality and distributing daily milestones, both deliverables launched on schedule with zero critical bugs.",
        keyTip: "Use the STAR method (Situation, Task, Action, Result) and emphasize proactive communication over panic."
      },
      {
        question: "What is your biggest professional weakness, and how are you improving it?",
        idealAnswer: "Early in my career, I found it difficult to delegate tasks because I felt responsible for every small detail, which occasionally bottlenecked team progress. Over the last year, I adopted structured delegation practices: defining clear acceptance criteria, providing asynchronous check-in milestones, and trusting colleagues to execute. This has helped me focus on higher-level system architecture while empowering my teammates.",
        keyTip: "Frame weakness as an authentic self-awareness trait coupled with concrete active steps you are taking to overcome it."
      },
      {
        question: "Why are you interested in joining our team and this specific role?",
        idealAnswer: "I have followed your product's recent evolution in real-time collaboration systems. My background in developing performant React frontends and scalable Node.js microservices directly matches the technical challenges your team is addressing. I thrive in environments solving high-impact problems, and I want to bring my experience in frontend optimization to directly accelerate user retention.",
        keyTip: "Connect your specific technical strengths to the company's real mission, avoiding generic compliments."
      }
    ],
    frontend: [
      {
        question: "How does the virtual DOM work in React, and how do you optimize re-renders?",
        idealAnswer: "The Virtual DOM is an in-memory lightweight representation of the real DOM tree. When state changes, React constructs a new virtual tree, runs a diffing algorithm (reconciliation) against the previous snapshot, and batches only the necessary mutation operations to the actual DOM. To optimize excessive re-renders, I memoize expensive pure sub-trees using React.memo, stabilize callbacks with useCallback, use useMemo for costly computations, and keep state localized.",
        keyTip: "Explain both the reconciliation mechanism and practical techniques used in production to avoid performance traps."
      },
      {
        question: "Explain the difference between Promise.all, Promise.allSettled, and Promise.race.",
        idealAnswer: "Promise.all executes multiple promises in parallel and resolves when all resolve, but immediately rejects if any single promise fails (fail-fast). Promise.allSettled waits until all promises conclude regardless of resolution or rejection, returning an array of outcome objects—ideal for independent batches where partial failure is tolerable. Promise.race resolves or rejects as soon as the first promise settles, useful for network request timeouts.",
        keyTip: "Highlight real-world use cases (e.g., timeout guards for .race, dashboard widget loading for .allSettled)."
      },
      {
        question: "How do you approach web accessibility (a11y) and Core Web Vitals in modern applications?",
        idealAnswer: "For a11y, I write semantic HTML elements (nav, main, button) before reaching for ARIA, ensure complete keyboard navigation with visible focus outlines, manage color contrast ratios to WCAG AA standards, and use aria-live for asynchronous toasts. For Core Web Vitals, I prioritize LCP by lazy-loading off-screen images and preloading critical hero assets, prevent CLS by defining aspect ratio placeholders, and minimize INP by offloading heavy JavaScript computations.",
        keyTip: "Demonstrate that accessibility and user-centric performance metrics are integral engineering principles, not afterthoughts."
      }
    ],
    backend: [
      {
        question: "How would you handle database scaling when a relational database hits read/write bottlenecks?",
        idealAnswer: "First, I analyze slow query execution plans and index hotspots. For read-heavy workloads, I introduce an in-memory caching tier like Redis for frequently accessed queries, followed by read-replica databases with load balancing. For write-heavy bottlenecks, I consider database connection pooling, asynchronous message queues (e.g. RabbitMQ or Kafka) to buffer non-critical writes, database sharding/partitioning by customer ID, or offloading unstructured analytical data to BigQuery.",
        keyTip: "Start with non-invasive indexing and caching solutions before proposing complex sharding architectures."
      },
      {
        question: "How do JWT authentication and session-based authentication compare in distributed systems?",
        idealAnswer: "Session-based authentication stores session data server-side (in memory or Redis) and sends an opaque cookie, making immediate session revocation straightforward but requiring stateful centralized storage across distributed services. JWTs are stateless, self-contained tokens containing signed claims. While they scale horizontally without database lookups on every request, token revocation before expiry is tricky without a short TTL and refresh-token rotation blacklist.",
        keyTip: "Discuss trade-offs between horizontal scalability and instant token revocation."
      },
      {
        question: "What is an idempotent API, and why is it crucial in financial or payment transactions?",
        idealAnswer: "An idempotent API produces identical side effects and state transitions even if invoked multiple times with identical parameters. In payment systems, transient network dropouts often cause clients to retry requests. By enforcing an Idempotency-Key header stored with an expiration lock in a cache, duplicate payment calls return the original transaction receipt rather than charging the customer's card twice.",
        keyTip: "Always mention the implementation mechanism: unique idempotency keys, atomic locks, and idempotency store."
      }
    ]
  }

  // FAQ items data
  const faqs = [
    {
      q: "How does the AI Interview system work?",
      a: "You select your desired job role, experience level, and interview mode (Technical or HR), or optionally upload your resume. The AI dynamically generates realistic questions tailored to your profile. You respond using your microphone (or by typing), while our system transcribes your speech in real time. After each response and at the end of the session, Gemini AI evaluates your correctness, communication clarity, and confidence."
    },
    {
      q: "Is uploading a resume mandatory?",
      a: "No, resume upload is completely optional! If you choose not to upload a resume, the AI generates questions tailored to your chosen job role and seniority level. However, uploading a resume allows the AI to parse your real past projects, tools, and technical experience to simulate genuine interview rounds where hiring managers probe your actual work."
    },
    {
      q: "How does the AI score my answers?",
      a: "Every answer is evaluated across 3 key dimensions: Technical Correctness (depth, accuracy, and relevance), Communication Quality (structure, clarity, conciseness), and Composure/Confidence (pacing, filler word density, and direct eye-contact tracking during video mode). You receive instant tactical feedback and an aggregate score on a 10-point scale."
    },
    {
      q: "Can I practice on mobile phones and tablets?",
      a: "Yes! AI Interview is fully responsive. You can speak into your phone's microphone with live speech recognition, watch the AI interviewer avatar, and review your feedback cards directly on Android and iOS browsers."
    },
    {
      q: "What is the difference between Audio and Video Interview modes?",
      a: "Audio Mode simulates traditional phone or voice screening rounds focusing on verbal clarity, pacing, and technical answers. Video Mode brings an AI video interviewer to your screen and utilizes real-time computer vision to measure candidate engagement, gaze symmetry, eye-contact stability, and body composure."
    },
    {
      q: "How do Credits work?",
      a: "Each interview session uses credits (50 credits for standard Audio interviews and 80 credits for full Video interviews). Every new user starts with free complimentary credits upon signup, and additional credits can be purchased at any time via the Pricing page."
    },
    {
      q: "Are my interview sessions and reports saved?",
      a: "Yes! Every completed session is preserved in your personal Interview History dashboard. You can review past question-by-question evaluations, track your score progression over time, and download formal PDF performance certificates and diagnostic reports."
    }
  ]

  return (
    <div className='min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-200'>
      <Navbar/>

      <div className='flex-col px-4 sm:px-6 py-12 md:py-20'>
        <div className='max-w-6xl mx-auto'>

          {/* 1. HERO SECTION */}
          <section className='text-center mb-24'>
            {/* Pill Banner */}
            <div className='flex justify-center mb-6'>
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm px-4 py-2 rounded-full flex items-center gap-2.5 shadow-xs"
              >
                <Logo className='text-emerald-600 dark:text-emerald-400' size={18}/>
                <span className='font-semibold text-slate-800 dark:text-slate-200'>
                  AI-Powered Mock Interview Platform
                </span>
                <span className='inline-block w-1.5 h-1.5 rounded-full bg-emerald-500'></span>
                <span className='text-emerald-600 dark:text-emerald-400 font-medium hidden sm:inline'>
                  Practice Like It's the Real Interview
                </span>
              </motion.div>
            </div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto text-slate-900 dark:text-white tracking-tight'
            >
              Master Your Next Job Interview with an{" "}
              <span className='relative inline-block mt-2 sm:mt-4'>
                <span className='bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30 px-5 py-1 rounded-3xl'>
                  AI Interviewer
                </span>
              </span>
            </motion.h1>

            {/* Richer Subtitle: What it does, who it helps, how it works */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className='text-slate-600 dark:text-slate-300 mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed'
            >
              Tailored for job seekers, software developers, and professionals. Upload your resume or pick any role to practice voice and video interviews with dynamic follow-ups, real-time timer pressure, and actionable AI feedback.
            </motion.p>

            {/* Trust highlights strip */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className='flex flex-wrap justify-center items-center gap-3 sm:gap-5 mt-6 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300'
            >
              <span className='flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-1.5 rounded-full shadow-2xs'>
                <BsCheckCircleFill className='text-emerald-500' size={14}/> Resume-Tailored Questions
              </span>
              <span className='flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-1.5 rounded-full shadow-2xs'>
                <BsCheckCircleFill className='text-emerald-500' size={14}/> Live Voice & Video AI
              </span>
              <span className='flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-1.5 rounded-full shadow-2xs'>
                <BsCheckCircleFill className='text-emerald-500' size={14}/> Instant Score & PDF Report
              </span>
            </motion.div>

            {/* Two Action Buttons */}
            <div className='flex flex-wrap justify-center gap-4 mt-8'>
              <motion.button
                onClick={() => {
                  if(!userData){
                    setShowAuth(true)
                    return
                  }
                  navigate("/interview")
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className='bg-emerald-600 text-white font-semibold px-9 py-3.5 rounded-full hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/25 dark:shadow-emerald-950/40 cursor-pointer flex items-center gap-2'
              >
                <span>Start Interview</span>
                <BsArrowRight size={18} />
              </motion.button>

              <motion.button
                onClick={() => {
                  if(!userData){
                    setShowAuth(true)
                    return
                  }
                  navigate("/history")
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className='border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 font-semibold px-9 py-3.5 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition shadow-sm cursor-pointer'
              >
                View History
              </motion.button>
            </div>
          </section>

          {/* 2. THREE FLOATING CARDS (Original Signature Visual) */}
          <section className='flex flex-col md:flex-row justify-center items-center gap-10 mb-28'>
            {[
              {
                icon: <Logo size={28}/>,
                step: "STEP: 1",
                title: "Role & Experience Selection",
                desc: "AI adjusts difficulty dynamically based on chosen role and resume technical stack.",
              },
              {
                icon: <BsMic size={24}/>,
                step: "STEP: 2",
                title: "Smart Voice Interview",
                desc: "Natural speech recognition with human-like AI audio voice and realistic questions.",
              },
              {
                icon: <BsClock size={24}/>,
                step: "STEP: 3",
                title: "Real Timer Pressure",
                desc: "Simulate the exact pressure of timed interviews with active countdown timers.",
              },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                animate={
                  idx === 0 || idx === 2 ?
                  { y: [0, -12, 0] } :
                  { y: [0, 12, 0] }
                }
                whileHover={{ rotate: 0, scale: 1.05 }}
                whileTap={{ rotate: 0, scale: 1.05 }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className={`relative bg-white dark:bg-[#1e293b] text-slate-800 dark:text-white rounded-3xl border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500/60 active:border-emerald-500/60 p-8 sm:p-10 w-80 max-w-[90%] shadow-md dark:shadow-xl hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] active:shadow-[0_0_25px_rgba(16,185,129,0.2)] transition-all cursor-pointer select-none
                ${idx === 0 ? "-rotate-1" : ""}
                ${idx === 1 ? "rotate-1 md:mt-6 shadow-xl" : ""}
                ${idx === 2 ? "-rotate-1" : ""}`}
              >
                <div className='absolute -top-8 left-1/2 -translate-x-1/2 bg-[#f8fafc] dark:bg-[#0f172a] border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 w-16 h-16 rounded-2xl flex items-center justify-center shadow-md'>
                  {item.icon}
                </div>
                <div className='pt-8 text-center'>
                  <div className='text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-2 tracking-wider'>{item.step}</div>
                  <h3 className='font-bold mb-3 text-lg text-slate-900 dark:text-white'>{item.title}</h3>
                  <p className='text-sm text-slate-600 dark:text-slate-300 leading-relaxed'>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </section>

          {/* 3. COMING SOON: AI VIDEO INTERVIEW FEATURE */}
          <section className='mb-32'>
            {isDark ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 via-emerald-950 to-gray-900 text-white p-8 md:p-14 shadow-2xl border border-emerald-500/30'
              >
                <div className='absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none' />
                <div className='absolute -bottom-24 -left-24 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none' />

                <div className='relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12'>
                  <div className='max-w-2xl'>
                    <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs md:text-sm font-semibold tracking-wide uppercase mb-6'>
                      <span className='w-2 h-2 rounded-full bg-emerald-400 animate-ping' />
                      Live Feature
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
                    <p className='text-xs text-gray-400 mb-5'>Next-Gen AI proctored video sessions available</p>

                    <button 
                      onClick={() => navigate("/interview")}
                      className='w-full py-2.5 px-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold tracking-wider uppercase transition cursor-pointer'
                    >
                      Try Video Interview
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='relative overflow-hidden rounded-3xl bg-linear-to-br from-white via-emerald-50/50 to-teal-50/30 text-slate-800 p-8 md:p-14 shadow-lg hover:shadow-xl border-2 border-emerald-200/80 transition-all'
              >
                <div className='absolute -top-24 -right-24 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none' />
                <div className='absolute -bottom-24 -left-24 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl pointer-events-none' />

                <div className='relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12'>
                  <div className='max-w-2xl'>
                    <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs md:text-sm font-semibold tracking-wide uppercase mb-6'>
                      <span className='w-2 h-2 rounded-full bg-emerald-500 animate-ping' />
                      Live Feature
                    </div>

                    <h2 className='text-3xl md:text-5xl font-bold tracking-tight mb-5 leading-tight text-slate-900'>
                      AI Real-Time <span className='text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600'>Video Interviews</span>
                    </h2>

                    <p className='text-slate-600 text-base md:text-lg leading-relaxed mb-8'>
                      Experience authentic face-to-face AI interviews with real-time camera tracking, facial expression analysis, eye contact metrics, and dynamic adaptive questioning.
                    </p>

                    <div className='grid sm:grid-cols-2 gap-4 text-sm'>
                      <div className='flex items-center gap-3 bg-white border border-emerald-100 rounded-xl p-3.5 shadow-xs'>
                        <div className='p-2 bg-emerald-100 text-emerald-600 rounded-lg'>
                          <BsCameraVideo size={18} />
                        </div>
                        <span className='font-medium text-slate-700'>Face & Eye Contact Tracking</span>
                      </div>
                      <div className='flex items-center gap-3 bg-white border border-emerald-100 rounded-xl p-3.5 shadow-xs'>
                        <div className='p-2 bg-emerald-100 text-emerald-600 rounded-lg'>
                          <BsShieldCheck size={18} />
                        </div>
                        <span className='font-medium text-slate-700'>Body Language & Confidence Score</span>
                      </div>
                    </div>
                  </div>

                  <div className='w-full lg:w-96 flex flex-col items-center justify-center bg-white border border-emerald-200/80 rounded-2xl p-7 shadow-md text-center relative'>
                    <div className='relative w-20 h-20 rounded-2xl bg-linear-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4'>
                      <FaVideo className='text-white text-3xl' />
                      <span className='absolute -top-1 -right-1 flex h-4 w-4'>
                        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
                        <span className='relative inline-flex rounded-full h-4 w-4 bg-emerald-500' />
                      </span>
                    </div>

                    <h3 className='font-semibold text-lg text-slate-900 mb-1'>Interactive Video Mode</h3>
                    <p className='text-xs text-slate-500 mb-5'>Next-Gen AI proctored video sessions available</p>

                    <button 
                      onClick={() => navigate("/interview")}
                      className='w-full py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold tracking-wider uppercase transition cursor-pointer'
                    >
                      Try Video Interview
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </section>

          {/* 4. HOW IT WORKS (Detailed 4-Step Process) */}
          <section className='mb-32'>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <span className='text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-xs sm:text-sm'>
                Simple 4-Step Journey
              </span>
              <h2 className='text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2'>
                How It Works
              </h2>
              <p className='text-slate-600 dark:text-slate-300 mt-4 text-sm sm:text-base'>
                From setup to actionable feedback in under 15 minutes. Practice authentic interview workflows with no complicated setup.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {[
                {
                  number: "01",
                  title: "Setup & Customize",
                  desc: "Select your target job role (e.g., Frontend, Fullstack, Backend), set experience level, pick Technical or HR mode, and optionally upload your resume.",
                  tag: "Personalization"
                },
                {
                  number: "02",
                  title: "AI Generates Questions",
                  desc: "Google Gemini scans your resume and seniority to generate project-specific, challenging, and role-appropriate interview questions on the fly.",
                  tag: "Smart Prompting"
                },
                {
                  number: "03",
                  title: "Speak & Answer Live",
                  desc: "Listen to the AI interviewer speak, answer naturally via speech-to-text with your microphone (or keyboard), and practice under realistic countdown timers.",
                  tag: "Live Simulation"
                },
                {
                  number: "04",
                  title: "Get Scores & PDF Report",
                  desc: "Receive instant evaluations on technical correctness, clarity, and confidence. Download a comprehensive diagnostic PDF report for your records.",
                  tag: "Instant Feedback"
                }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className='bg-white dark:bg-[#1e293b] rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md active:shadow-md hover:border-emerald-500/50 active:border-emerald-500/50 transition-all flex flex-col justify-between relative group cursor-pointer select-none'
                >
                  <div>
                    <div className='flex items-center justify-between mb-4'>
                      <span className='text-3xl font-black text-emerald-600/30 dark:text-emerald-400/30 group-hover:text-emerald-500 transition-colors'>
                        {step.number}
                      </span>
                      <span className='text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'>
                        {step.tag}
                      </span>
                    </div>
                    <h3 className='text-lg font-bold text-slate-900 dark:text-white mb-2.5'>
                      {step.title}
                    </h3>
                    <p className='text-sm text-slate-600 dark:text-slate-300 leading-relaxed'>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 5. FEATURES SECTION (Core Functionality Deep-Dive) */}
          <section className='mb-32'>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <span className='text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-xs sm:text-sm'>
                Built For Real Results
              </span>
              <h2 className='text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2'>
                Core Features for Serious Interview Prep
              </h2>
              <p className='text-slate-600 dark:text-slate-300 mt-4 text-sm sm:text-base'>
                Everything you need to sharpen technical arguments, overcome stage fright, and stand out in the hiring pipeline.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {[
                {
                  icon: <HiSparkles size={24} className='text-emerald-500' />,
                  title: "Adaptive Question Generation",
                  desc: "Unlike static question banks with repetitive flashcards, our AI crafts questions dynamically around your specific resume projects, tech stack, and difficulty requirements.",
                  bullets: [
                    "Resume PDF keyword and experience parsing",
                    "Dynamic follow-ups based on your previous answers",
                    "Supports Junior, Mid, and Senior difficulty tiers"
                  ]
                },
                {
                  icon: <BsMic size={24} className='text-emerald-500' />,
                  title: "Realistic Voice & Video Practice",
                  desc: "Practice answering verbally just like in a live screen. Speech recognition turns your spoken words into text instantly while the AI interviewer speaks questions aloud.",
                  bullets: [
                    "Continuous microphone speech recognition",
                    "Lifelike AI interviewer audio synthesis",
                    "Real-time timer pressure and pause controls"
                  ]
                },
                {
                  icon: <BsBarChart size={24} className='text-emerald-500' />,
                  title: "Multi-Metric AI Evaluation",
                  desc: "Receive actionable critiques immediately after answering each question. Identify exactly what you missed before you make that mistake in front of a real hiring manager.",
                  bullets: [
                    "Triple scoring: Correctness, Clarity, Confidence",
                    "Actionable advice on missing technical details",
                    "Downloadable PDF report with overall session summary"
                  ]
                }
              ].map((feat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className='bg-white dark:bg-[#1e293b] rounded-3xl p-8 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-lg active:shadow-lg hover:border-emerald-500/40 active:border-emerald-500/40 transition-all flex flex-col justify-between cursor-pointer select-none'
                >
                  <div>
                    <div className='w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center mb-6'>
                      {feat.icon}
                    </div>
                    <h3 className='text-xl font-bold text-slate-900 dark:text-white mb-3'>
                      {feat.title}
                    </h3>
                    <p className='text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6'>
                      {feat.desc}
                    </p>
                  </div>

                  <ul className='space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300'>
                    {feat.bullets.map((b, i) => (
                      <li key={i} className='flex items-start gap-2'>
                        <BsCheckCircleFill className='text-emerald-500 mt-0.5 shrink-0' size={14} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 6. SAMPLE QUESTIONS & ANSWERS (Interactive) */}
          <section className='mb-32'>
            <div className='text-center max-w-3xl mx-auto mb-12'>
              <span className='text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-xs sm:text-sm'>
                Interactive Preview
              </span>
              <h2 className='text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2'>
                Sample Interview Questions & Ideal Answers
              </h2>
              <p className='text-slate-600 dark:text-slate-300 mt-4 text-sm sm:text-base'>
                Explore real questions generated by our platform across different interview domains, paired with structured responses and AI scoring tips.
              </p>

              {/* Category Filter Tabs */}
              <div className='flex flex-wrap justify-center gap-2 mt-8'>
                {[
                  { id: 'hr', label: 'HR & Behavioral', icon: <FaUserTie size={14} /> },
                  { id: 'frontend', label: 'Frontend / React', icon: <FaCode size={14} /> },
                  { id: 'backend', label: 'Backend & Systems', icon: <BsPersonWorkspace size={14} /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSampleTab(tab.id)
                      setOpenSampleIndex(0)
                    }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition cursor-pointer ${
                      sampleTab === tab.id
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Questions Accordion List */}
            <div className='max-w-4xl mx-auto space-y-4'>
              {sampleQuestionsData[sampleTab].map((item, index) => {
                const isOpen = openSampleIndex === index
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    className='bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700/80 rounded-2xl overflow-hidden shadow-xs hover:border-emerald-500/40 active:border-emerald-500/40 transition'
                  >
                    <button
                      onClick={() => setOpenSampleIndex(isOpen ? null : index)}
                      className='w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer'
                    >
                      <div className='flex items-center gap-3'>
                        <span className='w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0'>
                          Q{index + 1}
                        </span>
                        <span className='font-bold text-slate-900 dark:text-white text-sm sm:text-base'>
                          {item.question}
                        </span>
                      </div>
                      <BsChevronDown
                        className={`text-slate-400 transition-transform duration-300 shrink-0 ${
                          isOpen ? 'rotate-180 text-emerald-500' : ''
                        }`}
                        size={16}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className='px-6 pb-6 pt-1 border-t border-slate-100 dark:border-slate-700/60'
                        >
                          <div className='bg-slate-50 dark:bg-slate-900/70 p-4 sm:p-5 rounded-xl border border-slate-200/80 dark:border-slate-700/60 mb-3'>
                            <div className='text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5'>
                              <BsCheckCircleFill size={13} /> Recommended Candidate Answer
                            </div>
                            <p className='text-sm text-slate-700 dark:text-slate-200 leading-relaxed'>
                              "{item.idealAnswer}"
                            </p>
                          </div>

                          <div className='flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400 bg-emerald-50/50 dark:bg-emerald-500/5 p-3 rounded-lg border border-emerald-100 dark:border-emerald-500/20'>
                            <BsLightbulb className='text-amber-500 shrink-0 mt-0.5' size={15} />
                            <span><strong className='text-slate-700 dark:text-slate-200'>What the AI evaluator looks for:</strong> {item.keyTip}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </section>

          {/* 7. BENEFITS SECTION */}
          <section className='mb-32'>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <span className='text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-xs sm:text-sm'>
                Why Choose AI Interview
              </span>
              <h2 className='text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2'>
                Proven Benefits for Job Candidates
              </h2>
              <p className='text-slate-600 dark:text-slate-300 mt-4 text-sm sm:text-base'>
                Master high-stakes interviews with data-backed insights rather than guessing what hiring managers want.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {[
                {
                  icon: <BsShieldCheck className='text-emerald-500' size={24} />,
                  title: "Eliminate Interview Anxiety",
                  desc: "Practice difficult questions in a safe, private environment until clear articulation and structured thinking become second nature."
                },
                {
                  icon: <BsLightningCharge className='text-amber-500' size={24} />,
                  title: "Instant Diagnostic Feedback",
                  desc: "No waiting days for recruiter feedback. Get line-by-line critiques on technical depth, structure, and speaking cadence immediately."
                },
                {
                  icon: <BsFileEarmarkText className='text-emerald-500' size={24} />,
                  title: "Resume-Specific Drilling",
                  desc: "Interviews shouldn't feel generic. Our engine scrutinizes your actual past employment and projects so you are never caught unprepared."
                },
                {
                  icon: <BsClock className='text-blue-500' size={24} />,
                  title: "Master Real Pacing",
                  desc: "Learn how to deliver comprehensive yet concise answers within realistic 60–90 second countdown windows, avoiding rambling."
                },
                {
                  icon: <BsGraphUpArrow className='text-emerald-500' size={24} />,
                  title: "Measurable Score Progression",
                  desc: "Track session scores over time. Watch your communication, technical, and composure scores rise with every practice round."
                },
                {
                  icon: <BsAward className='text-teal-500' size={24} />,
                  title: "24/7 Unlimited Availability",
                  desc: "Practice early morning, late at night, or 30 minutes before your real interview. No scheduling conflicts or expensive coach fees."
                }
              ].map((ben, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className='bg-white dark:bg-[#1e293b] p-7 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition flex flex-col justify-start'
                >
                  <div className='w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-5 border border-slate-200 dark:border-slate-700'>
                    {ben.icon}
                  </div>
                  <h3 className='text-lg font-bold text-slate-900 dark:text-white mb-2'>
                    {ben.title}
                  </h3>
                  <p className='text-sm text-slate-600 dark:text-slate-300 leading-relaxed'>
                    {ben.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 8. FAQ SECTION */}
          <section className='mb-32'>
            <div className='text-center max-w-3xl mx-auto mb-16'>
              <span className='text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-xs sm:text-sm'>
                Got Questions?
              </span>
              <h2 className='text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2'>
                Frequently Asked Questions
              </h2>
              <p className='text-slate-600 dark:text-slate-300 mt-4 text-sm sm:text-base'>
                Everything you need to know about preparing with our AI Interview platform.
              </p>
            </div>

            <div className='max-w-3xl mx-auto space-y-4'>
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className='bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700/80 rounded-2xl overflow-hidden shadow-xs hover:border-emerald-500/40 transition'
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className='w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer'
                    >
                      <span className='font-bold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-3'>
                        <BsQuestionCircle className='text-emerald-500 shrink-0' size={18} />
                        {faq.q}
                      </span>
                      <BsChevronDown
                        className={`text-slate-400 transition-transform duration-300 shrink-0 ${
                          isOpen ? 'rotate-180 text-emerald-500' : ''
                        }`}
                        size={16}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className='px-6 pb-6 pt-1 border-t border-slate-100 dark:border-slate-700/60'
                        >
                          <p className='text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-7'>
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </section>

          {/* 9. ADVANCED AI CAPABILITIES (Existing feature showcase) */}
          <section className='mb-32'>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .6 }}
              className='text-3xl sm:text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white'
            >
              Advanced AI{" "}
              <span className='text-emerald-600 dark:text-emerald-400'>Capabilities</span>
            </motion.h2>

            <div className='grid md:grid-cols-2 gap-10'>
              {[
                {
                  img: img5,
                  icon: <BsBarChart size={20}/>,
                  title: "AI Answer Evaluation",
                  desc: "Every response is deeply analyzed across technical correctness, communication clarity, and composure with constructive rationales.",
                },
                {
                  img: img6,
                  icon: <BsFileEarmarkText size={20}/>,
                  title: "Resume-Based Contextual Questioning",
                  desc: "Gemini AI parses your uploaded resume to target your real previous projects, libraries, and architectural decisions.",
                },
                {
                  img: img7,
                  icon: <BsFileEarmarkText size={20}/>,
                  title: "Comprehensive PDF Report",
                  desc: "Download official post-interview scorecards highlighting strengths, growth areas, and line-by-line feedback.",
                },
                {
                  img: img8,
                  icon: <BsBarChart size={20}/>,
                  title: "History & Trend Analytics",
                  desc: "Review past sessions anytime with performance metrics and progress charts to see tangible improvement over time.",
                },
              ].map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: .3, delay: idx * .15 }}
                  whileHover={{ scale: 1.02 }}
                  key={idx} 
                  className='bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/40 rounded-3xl p-8 shadow-sm dark:shadow-lg hover:shadow-xl transition-all'
                >
                  <div className='flex flex-col md:flex-row items-center gap-8'>
                    <div className='w-full md:w-1/2 flex justify-center'>
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className='w-full h-auto object-cover max-h-60 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50'
                      />
                    </div>

                    <div className='w-full md:w-1/2'>
                      <div className='bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 w-12 h-12 rounded-xl flex items-center justify-center mb-6'>
                        {item.icon}
                      </div>
                      <h3 className='font-bold mb-3 text-xl text-slate-900 dark:text-white'>{item.title}</h3>
                      <p className='text-slate-600 dark:text-slate-300 text-sm leading-relaxed'>{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 10. MULTIPLE INTERVIEW MODES (Existing mode showcase) */}
          <section className='mb-24'>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .6 }}
              className='text-3xl sm:text-4xl font-bold text-center mb-16 text-slate-900 dark:text-white'
            >
              Multiple Interview{" "}
              <span className='text-emerald-600 dark:text-emerald-400'>Modes</span>
            </motion.h2>

            <div className='grid md:grid-cols-2 gap-10'>
              {[
                {
                  img: img1,
                  title: "HR Behavioral Mode",
                  desc: "Simulates leadership, conflict resolution, situational judgment, and culture-fit rounds.",
                },
                {
                  img: img2,
                  title: "Technical Domain Mode",
                  desc: "Deep technical interrogation testing data structures, system design, and framework internals.",
                },
                {
                  img: img3,
                  title: "Confidence & Eye Contact Tracking",
                  desc: "Live gaze tracking and speech metrics measure composure under realistic interview conditions.",
                },
                {
                  img: img4,
                  title: "Fair Credit System",
                  desc: "Flexible credits allow you to practice targeted individual sessions or full interview batteries.",
                },
              ].map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: .3, delay: idx * .15 }}
                  whileHover={{ y: -8 }}
                  key={idx} 
                  className='bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500/40 rounded-3xl p-8 shadow-sm dark:shadow-lg hover:shadow-xl transition-all'
                >
                  <div className='flex items-center justify-between gap-6'>
                    <div className='w-1/2'>
                      <h3 className='font-bold text-xl mb-3 text-slate-900 dark:text-white'>
                        {item.title}
                      </h3>
                      <p className='text-slate-600 dark:text-slate-300 text-sm leading-relaxed'>
                        {item.desc}
                      </p>
                    </div>

                    <div className='w-1/2 flex justify-end'>
                      <img 
                        src={item.img}
                        alt={item.title}
                        className='w-28 h-28 md:w-32 md:h-32 object-cover rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50'
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* FINAL CTA BANNER */}
          <section className='mb-20 text-center bg-linear-to-r from-emerald-600 to-teal-600 text-white rounded-3xl p-10 sm:p-14 shadow-xl'>
            <h2 className='text-2xl sm:text-4xl font-extrabold mb-4'>
              Ready to Ace Your Upcoming Interview?
            </h2>
            <p className='text-emerald-100 max-w-xl mx-auto text-sm sm:text-base mb-8'>
              Join hundreds of candidates preparing smarter. Start your first session in under 2 minutes.
            </p>
            <motion.button
              onClick={() => {
                if(!userData){
                  setShowAuth(true)
                  return
                }
                navigate("/interview")
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-white text-emerald-800 font-bold px-10 py-3.5 rounded-full shadow-lg hover:bg-emerald-50 transition cursor-pointer text-sm sm:text-base'
            >
              Get Started Now — It's Free
            </motion.button>
          </section>

        </div>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)}/>}
      <Footer/>
    </div>
  )
}

export default Home