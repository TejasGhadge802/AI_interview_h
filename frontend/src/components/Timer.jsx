import React from "react";  
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { useTheme } from "../context/ThemeContext";

const Timer = ({ timeLeft, totalTime }) => {
    const { isDark } = useTheme();
    const percentage = (timeLeft / totalTime)*100;

  return (
    <div className="w-20 h-20">
        <CircularProgressbar 
            value={percentage}
            text={`${timeLeft}s`}
            styles={buildStyles({
                textSize : "28px",
                pathColor: "#10b981",
                textColor: "#ef4444",
                trailColor: isDark ? "#334155" : "#e2e8f0",
            })}
        />
    </div>
  )
}

export default Timer