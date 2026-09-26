import React,{ useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { BsCoin } from 'react-icons/bs'

const Pricing = () => {

  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("free");

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for begineers starting interview preparation.",
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
      price: "₹1",
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

  return (
    <div className='min-h-screen bg-linear-to-br from-gray-50 to-emerald-50 py-16 px-6'>

      <div className='max-w-6xl mx-auto mb-30 flex items-start gap-4'>
        
        <button onClick={()=>navigate("/")} className='mt-2 p-3 rounded-full bg-white shadow hover:shadow-md transition'>
          <FaArrowLeft className='text-gray-600 '/>
        </button>

        <div className='text-center w-full'>
          <h1 className='text-4xl font-bold text-gray-800'>
            Choose Your Plan
          </h1>

          <p className='text-gray-500 mt-3 text-lg'>
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
              whileHover={!p.default && { y: -5, scale: 1.05 }}
              onClick={() => !p.default && setSelectedPlan(p.id)}
              className={`relative bg-white rounded-xl shadow-lg p-6 border-2 
              ${
                isSelected ? 
                'border-emerald-500 shadow-2xl bg-white' : 
                'border-transparent shadow-2xl bg-white'
              }
              ${p.default ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {p.default && (
                <span className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-100 bg-gray-800 text-sm font-bold px-3 py-1 rounded-full'>
                  Default
                </span>
              )}
              {p.badge && (
                <span className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-100 bg-emerald-800 text-sm font-bold px-3 py-1 rounded-full'>
                  {p.badge}
                </span>
              )}

              
              <h3 className='text-xl font-bold text-gray-800 mt-4'>{p.name}</h3>
              <span className='flex items-center justify-between gap-3 mt-3'>
                <p className='text-3xl font-bold text-emerald-500'>{p.price}</p>
                <p className='text-emerald-800 mt-2 font-medium flex items-center gap-2'>
                  {p.credits} AI Interview <BsCoin size={20}/> Credits
                </p>
              </span>
              <p className='text-gray-500 mt-2'>{p.description}</p>
              <ul className='mt-4 space-y-2'>
                {p.features.map((feature, index) => (
                  <li key={index} className='flex items-center'>
                    <svg
                      className="w-5 h-5 bg-green-500 rounded-full p-1 mr-2"
                      fill="none"
                      stroke="white"
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
                <button className={`w-full mt-8 py-3 rounded-xl font-semibold transition 
                  ${
                    isSelected ?
                    "bg-emerald-600 text-white hover:opacity-90" :
                    "bg-gray-100 text-gray-700 hover:bg-emerald-100"
                  }`}>
                  {
                    isSelected ?
                    "Procced to Pay" :
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