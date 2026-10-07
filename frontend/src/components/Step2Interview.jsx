import React, { useState } from 'react'
import maleVideo from "../assets/videos/male.mp4"
import femaleVideo from "../assets/videos/female.mp4"
import Timer from './Timer'
import {motion} from "motion/react"
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'
import { useRef } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import {ServerUrl} from "../App"
import { BsArrowRight } from 'react-icons/bs'

const Step2Interview = ({interviewData, onFinish}) => {

  const {interviewId, questions, userName} = interviewData

  const [isintroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);
  const isAIPlayingRef = useRef(false);
  const isMicOnRef = useRef(true);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const videoRef = useRef(null);

  const currentQuestion = questions[currentIndex];

  const finalTranscriptRef = useRef("");

  useEffect(() => {
    isMicOnRef.current = isMicOn;
  }, [isMicOn]);

  useEffect(() => {
    isAIPlayingRef.current = isAIPlaying;
  }, [isAIPlaying]);





  useEffect(()=>{
    const loadVoices = ()=>{
      const voices = window.speechSynthesis.getVoices();

      if(!voices.length) return;

        // Femael Voice Default
        const femaleVoice =
          voices.find(v => 
            v.name.toLowerCase().includes("zira") ||
            v.name.toLowerCase().includes("samantha") ||
            v.name.toLowerCase().includes("female")
          );

        if (femaleVoice){
          setSelectedVoice(femaleVoice);
          setVoiceGender("female");
          return;
        }

          // Male Voice
        const maleVoice =
          voices.find(v => 
            v.name.toLowerCase().includes("david") ||
            v.name.toLowerCase().includes("mark") ||
            v.name.toLowerCase().includes("male")
          )

        if (maleVoice){
          setSelectedVoice(maleVoice);
          setVoiceGender("male");
          return;
        }

      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    }

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  },[])


  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;


  /* ------------------------------ Speak Function ------------------------ */
  const speakText = (text) => {
    return new Promise((resolve)=> {
      if(!window.speechSynthesis || !selectedVoice){
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const humanText = text
        .replace(/,/g, ", ... ")
        .replace(/\./g, ". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);

      utterance.voice = selectedVoice;

      utterance.rate = .92;
      utterance.pitch = 1.05;
      utterance.voice = selectedVoice;


      utterance.onstart = () => {
        isAIPlayingRef.current = true;
        setIsAIPlaying(true);
        stopMic();          // silence mic while AI speaks
        videoRef.current?.play();
      }

      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        isAIPlayingRef.current = false;
        setIsAIPlaying(false);

        if(isMicOnRef.current){
          startMic();
        }

        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300)
      }

      setSubtitle(text);
      window.speechSynthesis.speak(utterance);
    })
  }



  useEffect(()=>{
    if(!selectedVoice) return;

    const runIntro = async () => {
      if(isintroPhase){
        await speakText(
          `Hi ${userName}, it's great to meet you today. I hope your feeling confident and ready.`
        )

        await speakText(
          "I'll ask you a few questions. Just answer naturally, and take your time. let's begin."
        )

        setIsIntroPhase(false);
      }else if(currentQuestion){
        await new Promise(r => setTimeout(r, 800));

        if(currentIndex === questions.length-1){
          await speakText(
            "Alright, this one might be a bit more Challenging."
          )
        }

        await speakText(currentQuestion.question);
        // if(isMicOn){              //MIC ALREADY START CALLING STARTMIC AGAIN
        //   startMic();
        // }
      }
    }

    runIntro()
  }, [selectedVoice, isintroPhase, currentIndex])



  useEffect(()=>{
    if(isintroPhase) return;
    if(!currentQuestion) return;
    if(isSubmitting) return;

    const timer = setInterval(() => {
      setTimeLeft((prev)=>{
        if(prev <= 1){
          clearInterval(timer)
          return 0;
        }
        return prev - 1;
      })
    }, 1000);

    return ()=>clearInterval(timer);
  }, [isintroPhase, currentIndex, isSubmitting])


  useEffect(()=>{
    if(!isintroPhase && currentQuestion){
      setTimeLeft(currentQuestion.timeLimit || 60);
    }
  }, [currentIndex])


  // Clear saved speech transcript when advancing to the next question
  useEffect(() => {
    finalTranscriptRef.current = "";
  }, [currentIndex]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech Recognition API is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      isListeningRef.current = true;
    };

    recognition.onresult = (event) => {
      let interim = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscriptRef.current += text + " ";
        } else {
          interim += text;
        }
      }

      setAnswer(finalTranscriptRef.current + interim);
    };

    // Auto-restart if browser cuts off after silence and mic is still on
    recognition.onend = () => {
      isListeningRef.current = false;
      if (isMicOnRef.current && !isAIPlayingRef.current) {
        try {
          recognition.start();
        } catch (_) {}
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech") return;
      if (event.error === "aborted") return;
      console.warn("Speech recognition error:", event.error);
      isListeningRef.current = false;
    };

    recognitionRef.current = recognition;

    // Prompt for mic permission on mount so browser explicitly requests access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch((err) => {
          console.warn("Microphone access permission notice:", err);
        });
    }

    return () => {
      try {
        recognition.stop();
        recognition.abort();
      } catch (_) {}
      isListeningRef.current = false;
    };
  }, []);

  const startMic = () => {
    if (recognitionRef.current && !isListeningRef.current && !isAIPlayingRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn("Mic start notice:", err);
      }
    }
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      isListeningRef.current = false;
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
  };

  const toggleMic = () => {
    if (isMicOn) {
      isMicOnRef.current = false;
      stopMic();
    } else {
      isMicOnRef.current = true;
      startMic();
    }
    setIsMicOn((prev) => !prev);
  };


  const submitAnswer = async () => {
    if(isSubmitting) return;

    stopMic();
    setIsSubmitting(true);

    try {
      const result = await axios.post(ServerUrl + "/api/interview/submit-answer", {
        interviewId,
        questionIndex: currentIndex,
        answer,
        timeTaken: currentQuestion.timeLimit - timeLeft,
      }, {withCredentials: true})

      setFeedback(result.data.feedback)
      speakText(result.data.feedback)
      setIsSubmitting(false)
    } catch (err) {
      console.error("Answer Submit Error:", err)
      setIsSubmitting(false)
    }
  }


  const handleNext = async () => {
    setAnswer("");
    setFeedback("");

    if(currentIndex + 1 >= questions.length){
      finishInterview();
      return;
    }

    await speakText("Let's move on to the next question.");

    setCurrentIndex(currentIndex + 1);

    setTimeout(() => {         //MIC ALREADY START CALLING STARTMIC AGAIN
      if(isMicOn) startMic();
      // console.log("SETTIMEOUT START")
    }, 500);
  }

  const finishInterview = async () => {
    stopMic();
    setIsMicOn(false);
    try {
      const result  = await axios.post(ServerUrl + "/api/interview/finish", { interviewId }, { withCredentials: true })

      // console.log(result.data);
      onFinish(result.data);
    } catch (err) {
      // console.log("Finished Interview Error: ",err)
    }
  }

  useEffect(()=> {
    if(isintroPhase) return;
    if(!currentQuestion) return;

    if(timeLeft === 0 && !isSubmitting && !feedback){
      submitAnswer();
    }
  }, [timeLeft]);

  useEffect(()=>{
    return () => {
      if(recognitionRef.current){
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }

      window.speechSynthesis.cancel();
    }
  }, []);



  return (
    <div className='min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-800 dark:text-slate-100 flex items-center justify-center p-4 sm:p-6 transition-colors duration-200'>

      <div className='w-full max-w-350 min-h-[80vh] bg-white dark:bg-[#1e293b] rounded-3xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-slate-700/80 flex flex-col lg:flex-row overflow-hidden transition-colors duration-200'>

        {/* Video section */}
        <div className='w-full lg:w-[35%] bg-slate-50 dark:bg-slate-900/60 flex flex-col items-center p-6 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-700/80'>
            <div className={`relative w-full max-w-md rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${
              isAIPlaying 
                ? "ring-4 ring-emerald-500 dark:ring-emerald-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 shadow-emerald-500/30 scale-[1.01]" 
                : "border border-slate-200 dark:border-slate-700"
            }`}>
              <video 
                src={videoSource}
                key={videoSource}
                ref={videoRef} 
                muted
                playsInline
                preload='auto'
                className='w-full h-auto object-cover'
              />

              {/* AI Speaking floating animation indicator */}
              {isAIPlaying && (
                <div className='absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md border border-white/10'>
                  <div className='flex items-center gap-0.5 h-3'>
                    <motion.span 
                      animate={{ height: ["4px", "14px", "4px"] }} 
                      transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }} 
                      className='w-1 bg-emerald-400 rounded-full inline-block' 
                    />
                    <motion.span 
                      animate={{ height: ["10px", "4px", "12px", "6px"] }} 
                      transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut", delay: 0.1 }} 
                      className='w-1 bg-teal-300 rounded-full inline-block' 
                    />
                    <motion.span 
                      animate={{ height: ["4px", "16px", "8px"] }} 
                      transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut", delay: 0.2 }} 
                      className='w-1 bg-emerald-400 rounded-full inline-block' 
                    />
                    <motion.span 
                      animate={{ height: ["8px", "4px", "14px"] }} 
                      transition={{ repeat: Infinity, duration: 0.65, ease: "easeInOut", delay: 0.15 }} 
                      className='w-1 bg-teal-300 rounded-full inline-block' 
                    />
                  </div>
                  <span className='text-xs font-semibold text-white tracking-wide'>AI Speaking</span>
                </div>
              )}
            </div>

            {/* SUBTITLE */}
            {subtitle && (
              <motion.div 
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className='w-full max-w-md bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-xs'
              >
                <p className='text-slate-700 dark:text-slate-200 text-sm sm:text-base font-medium text-center leading-relaxed'>{subtitle}</p>
              </motion.div>
            )}


            {/* TIMER */}
            <div className='w-full max-w-md bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-md p-6 space-y-5'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-slate-500 dark:text-slate-400 font-medium'>Interview Status</span>
                {isAIPlaying ? (
                  <span className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 animate-pulse'>
                    <span className='w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block'></span>
                    AI Speaking
                  </span>
                ) : isMicOn ? (
                  <span className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-300 dark:border-teal-500/30'>
                    <span className='w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 inline-block animate-ping'></span>
                    Listening
                  </span>
                ) : (
                  <span className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600'>
                    <span className='w-2 h-2 rounded-full bg-slate-400 inline-block'></span>
                    Muted
                  </span>
                )}
              </div>

              <div className='h-px bg-slate-200 dark:bg-slate-700'></div>

              <div className='flex justify-center'>
                <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit || 60}/>
              </div>

              <div className='h-px bg-slate-200 dark:bg-slate-700'></div>

              <div className='grid grid-cols-2 gap-6 text-center'>
                <div>
                  <span className='text-2xl font-bold text-emerald-600 dark:text-emerald-400 mr-1'>{currentIndex + 1}</span>
                  <span className='text-xs text-slate-500 dark:text-slate-400 block mt-1'>Current Question</span>
                </div>

                <div>
                  <span className='text-2xl font-bold text-emerald-600 dark:text-emerald-400 mr-1'>{questions.length}</span>
                  <span className='text-xs text-slate-500 dark:text-slate-400 block mt-1'>Total Questions</span>
                </div>
              </div>


            </div>
        </div>


        {/* TEXT SECTION */}
        <div className='flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative bg-white dark:bg-[#1e293b]'>
          <h2 className='text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6'>
            AI Interview
          </h2>

          {!isintroPhase && 
            (
              <div className='relative mb-6 bg-slate-50 dark:bg-slate-900/80 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs'>
                <p className='text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-semibold mb-2'>Question {currentIndex + 1} of {questions.length}</p>

                <div className='text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed'>{currentQuestion?.question}</div>
              </div>
            )
          }

          <textarea placeholder='Type your answer here...'
            onChange={(e)=>setAnswer(e.target.value)}
            value={answer}
            className='flex-1 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition min-h-40'
          />

          {!feedback ?(
            <div className='flex items-center gap-4 mt-6'>
            {/* Mic button with pulsing glow & active audio wave bars */}
            <div className='relative flex items-center justify-center'>
              {/* Outer pulsing ping rings when mic is on and user can speak */}
              {isMicOn && !isAIPlaying && (
                <>
                  <span className='absolute -inset-2 rounded-full bg-emerald-400/30 animate-ping' />
                  <span className='absolute -inset-1 rounded-full bg-teal-400/40 animate-pulse' />
                </>
              )}

              <motion.button 
                onClick={toggleMic}
                whileTap={{ scale: 0.9 }}
                animate={isMicOn && !isAIPlaying ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                transition={isMicOn && !isAIPlaying ? { repeat: Infinity, duration: 1.4 } : {}}
                className={`relative z-10 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 cursor-pointer ${
                  isMicOn 
                    ? "bg-linear-to-r from-emerald-500 to-teal-500 shadow-emerald-500/50 hover:brightness-110" 
                    : "bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-white border border-slate-300 dark:border-slate-600 shadow-slate-900/40"
                }`}
                title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
              >
                {isMicOn ? <FaMicrophone size={20}/> : <FaMicrophoneSlash size={20}/>}
              </motion.button>
            </div>

            {/* Listening Live Audio Visualizer bars */}
            {isMicOn && !isAIPlaying && (
              <div className='hidden sm:flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 px-3.5 py-2.5 rounded-2xl shadow-xs'>
                <div className='flex items-center gap-0.5 h-4'>
                  <motion.span 
                    animate={{ height: ["4px", "14px", "6px"] }} 
                    transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }} 
                    className='w-1 bg-emerald-500 dark:bg-emerald-400 rounded-full inline-block' 
                  />
                  <motion.span 
                    animate={{ height: ["8px", "4px", "16px", "8px"] }} 
                    transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.1 }} 
                    className='w-1 bg-teal-500 dark:bg-teal-300 rounded-full inline-block' 
                  />
                  <motion.span 
                    animate={{ height: ["14px", "6px", "12px"] }} 
                    transition={{ repeat: Infinity, duration: 0.55, ease: "easeInOut", delay: 0.2 }} 
                    className='w-1 bg-emerald-500 dark:bg-emerald-400 rounded-full inline-block' 
                  />
                  <motion.span 
                    animate={{ height: ["6px", "16px", "4px"] }} 
                    transition={{ repeat: Infinity, duration: 0.45, ease: "easeInOut", delay: 0.15 }} 
                    className='w-1 bg-teal-500 dark:bg-teal-300 rounded-full inline-block' 
                  />
                </div>
                <span className='text-xs font-semibold text-emerald-700 dark:text-emerald-300 tracking-wide'>Listening...</span>
              </div>
            )}

            <motion.button 
            onClick={submitAnswer}
            disabled={isSubmitting}
            whileTap={{ scale: 0.96 }}
            className='flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-3 sm:py-4 rounded-2xl shadow-lg shadow-emerald-600/20 dark:shadow-emerald-950/40 transition font-semibold disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed cursor-pointer'>
              {isSubmitting ? "Submitting..." : "Submit Answer"}
            </motion.button>

            </div>
          ): (
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='mt-6 bg-emerald-50/60 dark:bg-slate-900/90 border border-emerald-200 dark:border-emerald-500/40 p-5 rounded-2xl shadow-xs'>
              <p className='text-emerald-800 dark:text-emerald-300 font-medium mb-4 leading-relaxed'>{feedback}</p>

              <button 
              onClick={handleNext}
              className='w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl shadow-md transition flex items-center justify-center gap-1 font-semibold cursor-pointer'>Next Question <BsArrowRight size={18}/></button>
            </motion.div>
          )}

        </div>


      </div>

    </div>
  )
}

export default Step2Interview