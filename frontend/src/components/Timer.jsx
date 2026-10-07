import React from "react";  
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const Timer = ({ timeLeft, totalTime }) => {
    const percentage = (timeLeft / totalTime)*100;

  return (
    <div className="w-20 h-20">
        <CircularProgressbar 
            value={percentage}
            text={`${timeLeft}s`}
            styles={buildStyles({
                textSize : "28px",
                pathColor: "#10b981",
                textColor: "#f87171",
                trailColor: "#334155",
            })}
        />
    </div>
  )
}

export default Timer