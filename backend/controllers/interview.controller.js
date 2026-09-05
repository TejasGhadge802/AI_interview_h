import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../services/openRouter.services.js";
import User from "../models/user.model.js";
import Interview from "../models/interview.model.js";

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume Required" });
    }
    const filePath = req.file.path;

    const fileBuffer = await fs.promises.readFile(filePath);
    const uint8Array = new Uint8Array(fileBuffer);

    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

    let resumeText = "";
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();

      const pageText = content.items.map((item) => item.str).join(" ");
      resumeText += pageText + "\n";
    }
    resumeText = resumeText.replace(/\s+/g, " ").trim();

    const messages = [
      {
        role: "system",
        content: `Extract structured data from resume.
                Return strictly JSON:
                {
                    "role": "string",
                    "experience": "string",
                    "projects": ["project1", "project2"],
                    "skills": ["skills1", "skills2"],
                }`,
      },
      {
        role: "user",
        content: resumeText,
      },
    ];

    const aiResponse = await askAi(messages);
    const parsed = JSON.parse(aiResponse);

    fs.unlinkSync(filePath);

    res.json({
      role: parsed.role,
      experience: parsed.experience,
      projects: parsed.projects,
      skills: parsed.skills,
      resumeText,
    });
  } catch (err) {
    console.error(err);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ message: err.message });
  }
};

export const generateQuestion = async (req, res) => {
  try {
    let { role, experience, mode, resumeText, projects, skills } = req.body;

    role = role?.trim();
    experience = experience?.trim();
    mode = mode?.trim();

    if (!role || !experience || !mode) {
      return res.status(400).json({
        message: "Role, Experience & Mode are Required",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not Found.",
      });
    }

    if (user.credits < 50) {
      return res.status(400).json({
        message: `Not enough credits, Min. {<BsCoin size={20}/>} 50 required.`,
      });
    }

    const projectText =
      Array.isArray(projects) && projects.length ? projects.join(", ") : "None";

    const skillsText =
      Array.isArray(skills) && skills.length ? skills.join(", ") : "None";

    const safeResume = resumeText?.trim() || "None";

    const userPrompt = `
            Role: ${role}
            Experience: ${experience}
            InterviewMode: ${mode}
            Projects: ${projectText}
            Skills: ${skillsText}
            Resume: ${safeResume}
        `;

    if (!userPrompt.trim()) {
      return res.status(400).json({
        message: "Prompt content is empty.",
      });
    }

    const messages = [
      {
        role: "system",
        content: `
            You are a real human interviewer conducting a professional interview.

            Speak in simple, natural English as if you are directly talking to the candidate.

            Generate exactly 5 interview questions.

            Strict Rules:
            - Each question must contain between 20 and 30 words.
            - Each question must be a single complete sentence.
            - Do NOT number them.
            - Do NOT add explanations.
            - Do NOT add extra text before or after.
            - One question per line only.
            - Keep language simple and conversational.
            - Questions must feel practical and realistic.

            Difficulty progression:
            Question 1 should be easy  
            Question 2 should be easy  
            Question 3 should be medium  
            Question 4 should be medium  
            Question 5 should be hard  

            Make questions based on the candidate's role, experience, interviewMode, projects, skills, and resume details.
        `,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ];

    const aiResponse = await askAi(messages);

    if (!aiResponse || !aiResponse.trim()) {
      console.log("AI returned empty response.")
      return res.status(500).json({
        message: "AI returned empty response.",
      });
    }

    const questionsArray = aiResponse
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0)
      .slice(0, 5);

    if (questionsArray.length === 0) {
      console.log("AI returned empty response.")
      return res.status(500).json({
        message: "AI failed to generate questions.",
      });
    }

    user.credits -= 1;                // Crediting
    await user.save();

    const interview = await Interview.create({
      userId: user._id,
      role,
      experience,
      mode,
      resumeText: safeResume,
      questions: questionsArray.map((q, idx) => ({
        question: q,
        difficulty: ["easy", "easy", "medium", "medium", "hard"][idx],
        timeLimit: [60, 60, 90, 90, 120][idx],
      })),
    });

    res.json({
      interviewId: interview._id,
      creditsLeft: user.credits,
      userName: user.name,
      questions: interview.questions,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: `Failed to create interview ${err}`
    })
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { interviewId, questionIndex, answer, timeTaken } = req.body;

    const interview = await Interview.findById(interviewId);
    const question = interview.questions[questionIndex];

    if (!answer) {
      question.score = 0;
      question.feedback = "You didn't Submitan answer.";
      question.answer = "";

      await interview.save();

      return res.json({
        feedback: question.feedback,
      });
    }

    if (timeTaken > question.timeLimit) {
      question.score = 0;
      question.feedback = "Time UP.";
      question.answer = answer;

      await interview.save();

      return res.json({
        feedback: question.feedback,
      });
    }

    const messages = [
      {
        role: "system",
        content: `
          You are a professional human interviewer evaluating a candidate's answer in a real interview.

          Evaluate naturally and fairly, like a real person would.

          Score the answer in these areas (0 to 10):

          1. Confidence - Does the answer sound clear, confident, and well-presented?
          2. Communication - Is the language simple, clear, and easy to understand?
          3. Correctness - Is the answer accurate, relevant, and complete?

          Rules:
          - Be realistic and unbiased.
          - Do not give random high scores.
          - If the answer is weak, score low.
          - If the answer is strong and detailed, score high.
          - Consider clarity, structure, and relevance.

          Calculate:
          finalScore = average of confidence, communication, and correctness (rounded to nearest whole number).

          Feedback Rules:
          - Write natural human feedback.
          - 10 to 15 words only.
          - Sound like real interview feedback.
          - Can suggest improvement if needed.
          - Do NOT repeat the question.
          - Do NOT explain scoring.
          - Keep tone professional and honest.

          Return ONLY valid JSON in this format:

          {
            "confidence": number,
            "communication": number,
            "correctness": number,
            "finalScore": number,
            "feedback": "short human feedback"
          }
        `,
      },
      {
        role: "user",
        content: `
          Question: ${question.question}
          Answer: ${answer}
        `,
      },
    ];

    const aiResponse = await askAi(message)

    const parsed = JSON.parse(aiResponse);

    question.answer = answer;
    question.confidence = parsed.confidence;
    question.communication = parsed.communication;
    question.correctness = parsed.correctness;
    question.score = parsed.score;
    question.feedback = parsed.feedback;


    await interview.save()

    return res.status(200).json({
      feedback: parsed.feedback
    })
  } catch (err) {
    return res.status(500).json({
      message: `Failed to Submit answer ${err}`
    })
  }
};



export const finishInterview = async (req, res) => {
  try {
    const {interviewId} = req.body

    const interview = await Interview.findById(interviewId)

    if(!interview){
      return res.status(400).json({
        message: "Failed to find Interview"
      })
    }

    const totalQuestions = interview.questions.length;

    let totalScore = 0;
    let totalConfidence = 0;
    let totalCommunication = 0;
    let totalCorrectness = 0;

    interview.questions.forEach((q)=>{
      totalScore += q.score || 0;
      totalConfidence += q.confidence || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0;
    })


    const finalScore = totalQuestions ? totalScore/totalQuestions : 0;
    const avgConfidence = totalQuestions ? totalConfidence/totalQuestions : 0;
    const avgCommunication = totalQuestions ? totalCommunication/totalQuestions : 0;
    const avgCorrectness = totalQuestions ? totalCorrectness/totalQuestions : 0;

    interview.finalScore = finalScore;
    interview.status = "completed"

    return res.status(200).json({
      finalScore: Number(finalScore.toFixed(1)),
      confidence: Number(avgConfidence.toFixed(1)),
      communication: Number(avgCommunication.toFixed(1)),
      correctness: Number(avgCorrectness.toFixed(1)),
      questionWiseScore: interview.questions.map((q)=> ({
        question: q.question,
        score: q.score || 0,
        feedback: q.feedback || 0,
        confidence: q.confidence || 0,
        communication: q.communication || 0,
        correctness: q.correctness || 0,
      })),
    })
  } catch (err) {
    return res.status(500).json({
      message: `Failed to Finish Interview answer ${err}`
    })
  }
}