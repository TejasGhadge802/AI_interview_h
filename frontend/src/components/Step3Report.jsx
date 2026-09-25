import React,{ useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"

const Step3Report = ({ report }) => {
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading Report...</p>
      </div>
    );
  }
  const navigate = useNavigate();

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, idx) => ({
    name: `Q${idx + 1}`,
    score: score.score || 0,
  }));

  const skills = [
    { label: "confidence", value: Number(confidence) },
    { label: "communication", value: Number(communication) },
    { label: "correctness", value: Number(correctness) },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement Required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;

  const skillContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const skillItem = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };


  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 300);

    return () => clearTimeout(timer);
  }, [percentage]);




  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin  * 2;
    
    let currrentY = 25;
    
    // TITLE
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(34, 197, 94);
    doc.text("AI Interview Performance Report", pageWidth / 2, currrentY, { align: "center" })

    currrentY += 5;

    // UNDERLINE
    doc.setDrawColor(34, 197, 94);
    doc.line(margin, currrentY + 2, pageWidth - margin, currrentY + 2);

    currrentY += 15;

    // FINAL SCORE
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(margin, currrentY, contentWidth, 20, 4, 4, "F");

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `Final Score: ${finalScore}/10`,
      pageWidth / 2,
      currrentY + 12,
      { align: "center" } 
    );

    currrentY += 30;

    // SKILLS SECTION
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, currrentY, contentWidth, 30, 4, 4, "F");

    doc.setFontSize(12);

    doc.text(`Confidence: ${confidence}`, margin + 10, currrentY + 10);
    doc.text(`Communication: ${communication}`, margin + 10, currrentY + 18);
    doc.text(`Correctness: ${correctness}`, margin + 10, currrentY + 26);

    currrentY += 45;

    // ADVICE
    let advice = "";
    if(finalScore >= 8){
      advice = "Excellent performace. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
    }else if(finalScore >= 5){
      advice = "Good Foundation shown. Improve clarity and structure. Practice delivering concise, confident and answer with stronger supporting examples."; 
    }else{
      advice = "Significant improvement required. Focus on structured thinking clarity, and confident delivery. Practice answerring aloud regularly.";
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220);
    doc.roundedRect(margin, currrentY, contentWidth, 35, 4, 4);
    
    doc.setFont("helvetica", "bold");
    doc.text("Professional Advice", margin + 10, currrentY + 10);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);


    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
    doc.text(splitAdvice, margin + 10, currrentY + 20);

    currrentY += 50;

    // Question Table
    autoTable(doc, {
      startY: currrentY,
      margin: { left: margin, right: margin },
      head: [["#", "Question", "Score", "Feedback"]],
      body: questionWiseScore.map((q, idx)=>[
        `${idx + 1}`,
        q.question,
        `${q.score}/10`,
        q.feedback,
      ]),
      styles: {
        fontSize: 9,
        cellPadding: 5,
        valign: "top",
      },
      headStyles: {
        fillColor: [34, 197, 94],
        textColor: 255,
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 55},
        2: { cellWidth: 20, halign: "center" },
        3: { cellWidth: "auto"},
      },
      alternateRowStyles:{
        fillColor: [249, 250, 251],
      },
    });

    doc.save("AI_Interview_Report.pdf");

  }


  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-green-50 px-4 sm:px-6 lg:px-10 py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="md:mb-10 w-full flex items-start gap-4 ">
          <button
            onClick={() => navigate("/history")}
            className="mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Interview Report Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Review your past interviews and performance.
            </p>
          </div>
        </div>

        <motion.button
          onClick={downloadPDF}
          whileHover={{ scale: 1.1, opacity: 0.8 }}
          whileTap={{ scale: 0.8 }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl shadow-md transition-all duration-150 font-semibold text-sm sm:text-base whitespace-nowrap shrink-0"
        >
          Download PDF
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 text-center"
          >
            <h3 className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
              Overall Performance
            </h3>

            <div className="relative w-32 h-32 sm:w-36 sm:h-36 mx-auto">
              <CircularProgressbar
                value={animatedPercentage}
                text={`${score}/10`}
                styles={buildStyles({
                  textSize: "20px",
                  pathColor: "#10b981",
                  textColor: "#ef4444",
                  trailColor: "#e5e7eb",
                  pathTransitionDuration: 1.2,
                })}
              />
            </div>

            <p className="text-gray-400 mt-3 text-xs sm:text-sm">Out of 10</p>

            <div className="mt-4">
              <p className="font-semibold text-gray-800 text-sm sm:text-base">
                {performanceText}
              </p>

              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                {shortTagline}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            whileHover={{
              y: -4,
              boxShadow: "0px 15px 30px rgba(0,0,0,0.08)",
              transition: { duration: 0.2 },
            }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8"
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">
              Skill Evaluation
            </h3>

            <motion.div
              variants={skillContainer}
              initial="hidden"
              animate="visible"
              className="space-y-5"
            >
              {skills.map((e, idx) => (
                <motion.div key={idx} variants={skillItem}>
                  <div className="flex justify-between mb-2 text-sm sm:text-base">
                    <span className="capitalize">{e.label}</span>

                    <span className="font-semibold text-gray-600">
                      {e.value}
                    </span>
                  </div>

                  <div className="bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
                    <motion.div
                      className="bg-emerald-500 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(e.value * 10, 100)}%` }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:md-6">
              Question-wise Performance
            </h3>

            <div className="h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={questionScoreData}
                  margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.03} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="#e5e7eb"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />

                  <YAxis
                    domain={[0, 10]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />

                  <Tooltip
                    cursor={{
                      stroke: "#10b981",
                      strokeWidth: 1,
                      strokeDasharray: "4 4",
                    }}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                    }}
                    labelStyle={{
                      color: "#374151",
                      fontWeight: 600,
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#scoreGradient)"
                    dot={{
                      r: 4,
                      fill: "#ffffff",
                      stroke: "#10b981",
                      strokeWidth: 3,
                    }}
                    activeDot={{
                      r: 6,
                      fill: "#10b981",
                      stroke: "#ffffff",
                      strokeWidth: 3,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

          </motion.div>


          <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8"
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-6">
              Question Breakdown
            </h3>

            <div className="space-y-6">
              {questionWiseScore.map((q, idx)=>(
                <div key={idx} className="bg-gray-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200"> 
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                    <div>
                      <p className="text-xs text-green-400">
                        Question: {idx + 1}
                      </p>

                      <p className="font-semibold text-gray-800 text-sm sm:text-base leading-relaxed">
                        {q.question || "Question not available."}
                      </p>
                    </div>


                    <div className="bg-gray-100 text-green-600 px-3 py-1 rounded-full font-bold text-sm sm:text-sm w-fit">
                      {q.score ?? 0}/10
                    </div>

                  </div>

                  <div className="bg-green-50 border border-gray-200 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-semibold mb-1">
                      AI Feedback
                    </p>

                    <p className="text-sm text-gray-700 leading-relaxed">
                      {
                        q.feedback && q.feedback.trim() !== "" ?
                        q.feedback :
                        "No feedback availablr for this question."
                      }
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Step3Report;
