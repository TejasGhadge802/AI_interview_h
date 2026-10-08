import React, { useState, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { BsCoin, BsInfoCircle } from 'react-icons/bs'
import axios from 'axios'
import { ServerUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const Pricing = () => {

  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [showTestNotice, setShowTestNotice] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTestNotice(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",  
      name: "Starter Plan",
      price: "₹1",  //Change to 100 and also update on line no. 64
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
    },
    {
      id: "pro",
      name: "Pro Plan",
      price: "₹500",
      credits: 750,
      description: "Perfect for professionals looking to excel in their interviews.",
      features: [
        "750 AI Interview Credits",
        "Advanced Performance Report",
        "Personalized Improvement Suggestions",
        "Priority Support",
      ],
      badge: "Superior",
    },
  ]


  const handelPayment = async (plan) => {
    try {
      setLoadingPlan(plan.id);

      const amount = 
        plan.id === "basic" ? 1 :
        plan.id === "pro" ? 500 : 0;

      const result = await axios.post(ServerUrl + "/api/payment/order", {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,
      }, { withCredentials: true })

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "AI Interview Simulator",
        description: `${plan.name} - ${plan.credits} Credits.`,
        order_id: result.data.id,

        handler:async function (res) {
          const verifyPayment = await axios.post(ServerUrl + "/api/payment/verify", res, { withCredentials: true })

          dispatch(setUserData(verifyPayment.data.user))

          alert("Payment Successful.")
          navigate("/");
        },
        theme: {
          color: "#10b981",
        },
      }

      const razpay = new window.Razorpay(options);
      razpay.open();
      
      setLoadingPlan(null);
    } catch (err) {
      console.log(err);
      setLoadingPlan(null);
    }
  }


  return (
    <div className='relative min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-800 dark:text-slate-100 py-16 px-6 transition-colors duration-200'>

      {/* 3-SECOND TEST MODE POP-UP */}
      <AnimatePresence>
        {showTestNotice && (
          <div className='fixed inset-x-0 top-6 z-50 flex justify-center px-4 pointer-events-none'>
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className='pointer-events-auto relative w-full max-w-lg bg-white/95 dark:bg-[#1e293b]/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border-2 border-emerald-500 text-slate-800 dark:text-slate-100 shadow-[0_10px_35px_rgba(16,185,129,0.25)]'
            >
              <div className='flex items-start gap-3.5'>
                <div className='w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0'>
                  <BsInfoCircle size={22} />
                </div>
                <div className='flex-1 pr-4'>
                  <div className='flex items-center gap-2 mb-1'>
                    <h3 className='font-bold text-base text-slate-900 dark:text-white'>
                      Payment Test Mode
                    </h3>
                    <span className='px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40'>
                      Notice
                    </span>
                  </div>
                  <p className='text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed'>
                    This payment feature is currently in <strong>test mode</strong>. You can pay via any method without mentioning or entering your real bank details.
                  </p>
                </div>
                <button
                  onClick={() => setShowTestNotice(false)}
                  className='text-slate-400 hover:text-slate-600 dark:hover:text-white text-xl p-1 cursor-pointer transition leading-none'
                  aria-label='Close test mode notice'
                >
                  &times;
                </button>
              </div>

              {/* 3-Second countdown progress bar */}
              <div className='mt-3.5 w-full bg-slate-100 dark:bg-slate-700/60 h-1.5 rounded-full overflow-hidden'>
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 8 , ease: "linear" }}
                  className='h-full bg-emerald-500 rounded-full'
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className='max-w-6xl mx-auto mb-20 flex items-start gap-4'>
        
        <button onClick={()=>navigate("/")} className='mt-2 p-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition shadow-xs cursor-pointer'>
          <FaArrowLeft />
        </button>

        <div className='text-center w-full'>
          <h1 className='text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white'>
            Choose Your Plan
          </h1>

          <p className='text-slate-600 dark:text-slate-300 mt-3 text-base sm:text-lg'>
            Select the perfect plan for your interview preparation needs.
          </p>
        </div>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>

        {plans.map((p)=>{
          const isSelected = selectedPlan === p.id;

          return(
            <motion.div
              key={p.id}
              whileHover={!p.default && { y: -5, scale: 1.02 }}
              onClick={() => !p.default && setSelectedPlan(p.id)}
              className={`relative bg-white dark:bg-[#1e293b] rounded-2xl shadow-md dark:shadow-xl p-6 border-2 transition-all 
              ${
                isSelected ? 
                'border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.25)]' : 
                'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }
              ${p.default ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'}
              `}
            >
              {p.default && (
                <span className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider'>
                  Default
                </span>
              )}
              {p.badge && (
                <span className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider'>
                  {p.badge}
                </span>
              )}

              
              <h3 className='text-xl font-bold text-slate-900 dark:text-white mt-4'>{p.name}</h3>
              <span className='flex items-center justify-between gap-3 mt-3'>
                <p className='text-3xl font-bold text-emerald-600 dark:text-emerald-400'>{p.price}</p>
                <p className='text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-1.5 text-sm'>
                  {p.credits} Credits <BsCoin size={16} className='text-amber-500 dark:text-amber-400'/>
                </p>
              </span>
              <p className='text-slate-600 dark:text-slate-300 mt-3 text-sm leading-relaxed'>{p.description}</p>
              <ul className='mt-6 space-y-3'>
                {p.features.map((feature, index) => (
                  <li key={index} className='flex items-center text-sm text-slate-700 dark:text-slate-200'>
                    <svg
                      className="w-5 h-5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full p-1 mr-3 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>


              { 
                !p.default &&
                <button disabled={loadingPlan === p.id} 
                onClick={(e)=>
                  {e.stopPropagation()
                  if(!isSelected){
                    setSelectedPlan(p.id)
                  }else{
                    handelPayment(p)
                  }
                }}
                className={`w-full mt-8 py-3 rounded-xl font-semibold transition cursor-pointer 
                  ${
                    isSelected ?
                    "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 dark:shadow-emerald-950/50" :
                    "bg-slate-100 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600"
                  }`}>
                  {
                    loadingPlan === p.id ? 
                    "Processing..." :
                    isSelected ?
                    "Proceed To Pay" :
                    "Select Plan"
                  }
                </button>
              }
            </motion.div>
          )
        })}

      </div>

    </div>
  )
}

export default Pricing