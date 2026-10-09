import React from 'react'

const Logo = ({ size = 20, className = '', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 transition-transform ${className}`}
      aria-label="AI Interview Logo"
      {...props}
    >
      {/* Headset Arc */}
      <path
        d="M3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Headset Ear Cushions */}
      <rect x="2" y="10.5" width="2.2" height="5" rx="1.1" fill="currentColor" />
      <rect x="19.8" y="10.5" width="2.2" height="5" rx="1.1" fill="currentColor" />

      {/* Microphone Boom & Tip */}
      <path
        d="M3.5 14C3.5 17.5 6 20 9.5 20H10.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="11.5" cy="20" r="1.3" fill="currentColor" />

      {/* Robot / AI Head Shell */}
      <rect
        x="6"
        y="7.5"
        width="12"
        height="10"
        rx="3.2"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      {/* Glowing Intelligent Eyes */}
      <circle cx="9" cy="11.5" r="1.3" fill="currentColor" />
      <circle cx="15" cy="11.5" r="1.3" fill="currentColor" />

      {/* Dynamic Voice Waveform Mouth */}
      <path
        d="M10 14.8V14.8M12 13.8V15.8M14 14.8V14.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      {/* Antenna Spark / Connectivity */}
      <path
        d="M12 5V2.5M10.5 3.75H13.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default Logo

