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
    role = "role",
    mode = "mode",

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




  // const downloadPDF = () => {
  //   const doc = new jsPDF("p", "mm", "a4");

  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const margin = 20;
  //   const contentWidth = pageWidth - margin  * 2;
    
  //   let currrentY = 25;
    
  //   // TITLE
  //   doc.setFont("helvetica", "bold");
  //   doc.setFontSize(20);
  //   doc.setTextColor(34, 197, 94);
  //   doc.text("AI Interview Performance Report", pageWidth / 2, currrentY, { align: "center" })

  //   currrentY += 5;

  //   // UNDERLINE
  //   doc.setDrawColor(34, 197, 94);
  //   doc.line(margin, currrentY + 2, pageWidth - margin, currrentY + 2);

  //   currrentY += 15;

  //   // FINAL SCORE
  //   doc.setFillColor(240, 253, 244);
  //   doc.roundedRect(margin, currrentY, contentWidth, 20, 4, 4, "F");

  //   doc.setFontSize(14);
  //   doc.setTextColor(0, 0, 0);
  //   doc.text(
  //     `Final Score: ${finalScore}/10`,
  //     pageWidth / 2,
  //     currrentY + 12,
  //     { align: "center" } 
  //   );

  //   currrentY += 30;

  //   // SKILLS SECTION
  //   doc.setFillColor(249, 250, 251);
  //   doc.roundedRect(margin, currrentY, contentWidth, 30, 4, 4, "F");

  //   doc.setFontSize(12);

  //   doc.text(`Confidence: ${confidence}`, margin + 10, currrentY + 10);
  //   doc.text(`Communication: ${communication}`, margin + 10, currrentY + 18);
  //   doc.text(`Correctness: ${correctness}`, margin + 10, currrentY + 26);

  //   currrentY += 45;

  //   // ADVICE
  //   let advice = "";
  //   if(finalScore >= 8){
  //     advice = "Excellent performace. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
  //   }else if(finalScore >= 5){
  //     advice = "Good Foundation shown. Improve clarity and structure. Practice delivering concise, confident and answer with stronger supporting examples."; 
  //   }else{
  //     advice = "Significant improvement required. Focus on structured thinking clarity, and confident delivery. Practice answerring aloud regularly.";
  //   }

  //   doc.setFillColor(255, 255, 255);
  //   doc.setDrawColor(220);
  //   doc.roundedRect(margin, currrentY, contentWidth, 35, 4, 4);
    
  //   doc.setFont("helvetica", "bold");
  //   doc.text("Professional Advice", margin + 10, currrentY + 10);

  //   doc.setFont("helvetica", "normal");
  //   doc.setFontSize(11);


  //   const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
  //   doc.text(splitAdvice, margin + 10, currrentY + 20);

  //   currrentY += 50;

  //   // Question Table
  //   autoTable(doc, {
  //     startY: currrentY,
  //     margin: { left: margin, right: margin },
  //     head: [["#", "Question", "Score", "Feedback"]],
  //     body: questionWiseScore.map((q, idx)=>[
  //       `${idx + 1}`,
  //       q.question,
  //       `${q.score}/10`,
  //       q.feedback,
  //     ]),
  //     styles: {
  //       fontSize: 9,
  //       cellPadding: 5,
  //       valign: "top",
  //     },
  //     headStyles: {
  //       fillColor: [34, 197, 94],
  //       textColor: 255,
  //       halign: "center",
  //     },
  //     columnStyles: {
  //       0: { cellWidth: 10, halign: "center" },
  //       1: { cellWidth: 55},
  //       2: { cellWidth: 20, halign: "center" },
  //       3: { cellWidth: "auto"},
  //     },
  //     alternateRowStyles:{
  //       fillColor: [249, 250, 251],
  //     },
  //   });

  //   doc.save("AI_Interview_Report.pdf");

  // }

  const downloadPDF = () => {
  const doc = new jsPDF("p", "mm", "a4");

  // -----------------------------
  // CONSTANTS & COLORS
  // -----------------------------
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  const COLORS = {
    green: [34, 197, 94],
    darkGreen: [22, 101, 52],
    lightGreen: [240, 253, 244],
    veryLightGreen: [247, 254, 249],

    dark: [31, 41, 55],
    gray: [107, 114, 128],
    lightGray: [229, 231, 235],
    background: [249, 250, 251],
    white: [255, 255, 255],

    yellow: [245, 158, 11],
    red: [239, 68, 68],
  };

  let currentY = 20;

  // -----------------------------
  // HELPER FUNCTIONS
  // -----------------------------

  const addPageFooter = () => {
    doc.setDrawColor(...COLORS.lightGray);
    doc.line(
      margin,
      pageHeight - 14,
      pageWidth - margin,
      pageHeight - 14
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.gray);

    doc.text(
      "AI Interview Performance Report",
      margin,
      pageHeight - 8
    );

    doc.text(
      `Page ${doc.internal.getNumberOfPages()}`,
      pageWidth - margin,
      pageHeight - 8,
      { align: "right" }
    );
  };

  const getScoreColor = (score) => {
    if (score >= 8) return COLORS.green;
    if (score >= 5) return COLORS.yellow;
    return COLORS.red;
  };

  const getScoreLabel = (score) => {
    if (score >= 8) return "Excellent";
    if (score >= 5) return "Good";
    return "Needs Improvement";
  };

  // -----------------------------
  // HEADER
  // -----------------------------

  doc.setFillColor(...COLORS.lightGreen);
  doc.roundedRect(
    margin,
    currentY,
    contentWidth,
    42,
    5,
    5,
    "F"
  );

  // Small label
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.darkGreen);

  doc.text(
    "INTERVIEW ANALYSIS",
    margin + 10,
    currentY + 11
  );

  // Main title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...COLORS.dark);

  doc.text(
    "AI Interview Performance Report",
    margin + 10,
    currentY + 23
  );

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.gray);

  doc.text(
    "Performance overview and question-by-question evaluation",
    margin + 10,
    currentY + 32
  );

  currentY += 52;

  // -----------------------------
  // SCORE CARD
  // -----------------------------

  const scoreColor = getScoreColor(finalScore);
  const scoreLabel = getScoreLabel(finalScore);

  doc.setFillColor(...COLORS.white);
  doc.setDrawColor(...COLORS.lightGray);

  doc.roundedRect(
    margin,
    currentY,
    contentWidth,
    35,
    5,
    5,
    "FD"
  );

  // Left title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.dark);

  doc.text(
    "Overall Performance",
    margin + 10,
    currentY + 12
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.gray);

  doc.text(
    "Your overall interview evaluation",
    margin + 10,
    currentY + 21
  );

  // Score badge
  const badgeWidth = 45;
  const badgeHeight = 23;
  const badgeX = pageWidth - margin - badgeWidth;
  const badgeY = currentY + 6;

  doc.setFillColor(...scoreColor);

  doc.roundedRect(
    badgeX,
    badgeY,
    badgeWidth,
    badgeHeight,
    5,
    5,
    "F"
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...COLORS.white);

  doc.text(
    `${finalScore}/10`,
    badgeX + badgeWidth / 2,
    badgeY + 10,
    { align: "center" }
  );

  doc.setFontSize(8);

  doc.text(
    scoreLabel,
    badgeX + badgeWidth / 2,
    badgeY + 17,
    { align: "center" }
  );

  currentY += 45;

  // -----------------------------
  // SKILLS SECTION
  // -----------------------------

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...COLORS.dark);

  doc.text("Core Skills", margin, currentY);

  currentY += 7;

  const skillGap = 5;
  const skillWidth = (contentWidth - skillGap * 2) / 3;
  const skillHeight = 28;

  const skills = [
    {
      label: "Confidence",
      value: confidence,
    },
    {
      label: "Communication",
      value: communication,
    },
    {
      label: "Correctness",
      value: correctness,
    },
  ];

  skills.forEach((skill, index) => {
    const x = margin + index * (skillWidth + skillGap);

    doc.setFillColor(...COLORS.background);
    doc.setDrawColor(...COLORS.lightGray);

    doc.roundedRect(
      x,
      currentY,
      skillWidth,
      skillHeight,
      4,
      4,
      "FD"
    );

    // Skill label
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.gray);

    doc.text(
      skill.label.toUpperCase(),
      x + 7,
      currentY + 9
    );

    // Skill value
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...COLORS.darkGreen);

    doc.text(
      String(skill.value),
      x + 7,
      currentY + 19
    );
  });

  currentY += skillHeight + 15;

  // -----------------------------
  // PROFESSIONAL ADVICE
  // -----------------------------

  let advice = "";

  if (finalScore >= 8) {
    advice =
      "Excellent performance. Maintain your confidence and structured approach. Continue refining clarity and strengthen your answers with relevant real-world examples.";
  } else if (finalScore >= 5) {
    advice =
      "Good foundation demonstrated. Focus on improving clarity and answer structure. Practice delivering concise, confident responses supported by stronger examples.";
  } else {
    advice =
      "Significant improvement is recommended. Focus on structured thinking, clarity, and confident delivery. Practice answering questions aloud regularly.";
  }

  doc.setFillColor(...COLORS.veryLightGreen);
  doc.setDrawColor(...COLORS.green);

  doc.roundedRect(
    margin,
    currentY,
    contentWidth,
    40,
    5,
    5,
    "FD"
  );

  // Accent bar
  doc.setFillColor(...COLORS.green);

  doc.roundedRect(
    margin,
    currentY,
    3,
    40,
    2,
    2,
    "F"
  );

  // Advice heading
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.darkGreen);

  doc.text(
    "Professional Advice",
    margin + 10,
    currentY + 11
  );

  // Advice text
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.dark);

  const splitAdvice = doc.splitTextToSize(
    advice,
    contentWidth - 22
  );

  doc.text(
    splitAdvice,
    margin + 10,
    currentY + 20
  );

  currentY += 52;

  // -----------------------------
  // QUESTION-BY-QUESTION ANALYSIS
  // -----------------------------

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...COLORS.dark);

  doc.text(
    "Question-by-Question Analysis",
    margin,
    currentY
  );

  currentY += 5;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.gray);

  doc.text(
    "Detailed evaluation of each interview response",
    margin,
    currentY + 5
  );

  currentY += 12;

  // -----------------------------
  // TABLE
  // -----------------------------

  autoTable(doc, {
    startY: currentY,

    margin: {
      left: margin,
      right: margin,
      bottom: 20,
    },

    head: [
      [
        "#",
        "Question",
        "Score",
        "Feedback",
      ],
    ],

    body: questionWiseScore.map((q, idx) => [
      `${idx + 1}`,
      q.question,
      `${q.score}/10`,
      q.feedback,
    ]),

    theme: "grid",

    styles: {
      font: "helvetica",
      fontSize: 8.5,
      cellPadding: 4,
      valign: "top",
      textColor: COLORS.dark,
      lineColor: COLORS.lightGray,
      lineWidth: 0.2,
    },

    headStyles: {
      fillColor: COLORS.darkGreen,
      textColor: COLORS.white,
      fontStyle: "bold",
      fontSize: 9,
      halign: "center",
      valign: "middle",
      cellPadding: 4,
    },

    bodyStyles: {
      fillColor: COLORS.white,
    },

    alternateRowStyles: {
      fillColor: COLORS.background,
    },

    columnStyles: {
      0: {
        cellWidth: 9,
        halign: "center",
        fontStyle: "bold",
      },

      1: {
        cellWidth: 52,
      },

      2: {
        cellWidth: 20,
        halign: "center",
        fontStyle: "bold",
      },

      3: {
        cellWidth: "auto",
      },
    },

    didParseCell: function (data) {
      // Color score cells
      if (
        data.section === "body" &&
        data.column.index === 2
      ) {
        const score =
          parseFloat(data.cell.raw) || 0;

        if (score >= 8) {
          data.cell.styles.textColor =
            COLORS.darkGreen;
        } else if (score >= 5) {
          data.cell.styles.textColor =
            [180, 83, 9];
        } else {
          data.cell.styles.textColor =
            [185, 28, 28];
        }
      }
    },

    didDrawPage: function () {
      addPageFooter();
    },
  });

  // -----------------------------
  // FINAL FOOTER
  // -----------------------------

  const finalY = doc.lastAutoTable.finalY;

  if (finalY < pageHeight - 25) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.gray);

    doc.text(
      "Generated by AI Interview Performance Analyzer",
      pageWidth / 2,
      finalY + 12,
      { align: "center" }
    );
  }

  // -----------------------------
  // SAVE
  // -----------------------------


  const cleanFileName = (value) =>
    String(value || "")
      .trim()
      .replace(/[^a-zA-Z0-9-_]/g, "_");

  const fileName =
    `${cleanFileName(role)}_${cleanFileName(mode)}_AI_Interview_Performance_Report.pdf`;

  doc.save(fileName);

};


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
