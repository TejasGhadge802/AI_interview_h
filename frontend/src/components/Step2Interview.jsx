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
  const restartTimeoutRef = useRef(null);

  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState("");
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female"); // Default Female Interviewer (Sarah)
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

  // Voice detection helpers (word boundary to prevent "female".includes("male") bugs)
  const isMaleVoiceName = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("female") || lower.includes("woman")) return false;
    return /\b(male|david|mark|george|daniel|arthur|alex|rishi|fred|guy)\b/i.test(lower) ||
           lower.includes("male");
  };

  const isFemaleVoiceName = (name) => {
    const lower = name.toLowerCase();
    return /\b(female|zira|samantha|karen|victoria|moira|tessa|fiona|susan|cathy|alice|eva)\b/i.test(lower) ||
           lower.includes("female") || lower.includes("woman");
  };

  const updateVoiceForGender = (gender, availableVoices = null) => {
    const voices = availableVoices || (window.speechSynthesis ? window.speechSynthesis.getVoices() : []);
    if (!voices || voices.length === 0) return;

    if (gender === "female") {
      const female = voices.find(v => isFemaleVoiceName(v.name) && v.lang.startsWith("en")) ||
                     voices.find(v => isFemaleVoiceName(v.name)) ||
                     voices.find(v => v.lang.startsWith("en") && !isMaleVoiceName(v.name)) ||
                     voices[0];
      setSelectedVoice(female);
    } else {
      const male = voices.find(v => isMaleVoiceName(v.name) && v.lang.startsWith("en")) ||
                   voices.find(v => isMaleVoiceName(v.name)) ||
                   voices.find(v => v.lang.startsWith("en") && !isFemaleVoiceName(v.name)) ||
                   voices[0];
      setSelectedVoice(male);
    }
  };

  const switchGender = (gender) => {
    setVoiceGender(gender);
    updateVoiceForGender(gender);
  };

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      updateVoiceForGender(voiceGender, voices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

  /* ------------------------------ Speak Function ------------------------ */
  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const humanText = text
        .replace(/,/g, ", ... ")
        .replace(/\./g, ". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);
      utterance.voice = selectedVoice;
      utterance.rate = 0.92;
      // Explicit pitch matching: 1.05 for feminine, 0.82 for masculine timbre
      utterance.pitch = voiceGender === "male" ? 0.82 : 1.05;

      utterance.onstart = () => {
        isAIPlayingRef.current = true;
        setIsAIPlaying(true);
        stopMic(); // silence mic while AI speaks
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
        isAIPlayingRef.current = false;
        setIsAIPlaying(false);

        // Allow 350ms for mobile audio hardware to switch cleanly from playback to mic recording
        setTimeout(() => {
          if (isMicOnRef.current && !isAIPlayingRef.current) {
            startMic();
          }
        }, 350);

        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };

      setSubtitle(text);
      window.speechSynthesis.speak(utterance);
    });
  };



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
      setMicError("Speech recognition is not supported in this browser. Please type your answer.");
      return;
    }

    const recognition = new SpeechRecognition();
    const navLang = navigator.language || "en-US";
    recognition.lang = navLang.startsWith("en") ? navLang : "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      isListeningRef.current = true;
      setIsListening(true);
      setMicError("");
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

    // Auto-restart with safe debounce if mobile browser cuts off after brief silence
    recognition.onend = () => {
      isListeningRef.current = false;
      setIsListening(false);
      if (isMicOnRef.current && !isAIPlayingRef.current) {
        if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = setTimeout(() => {
          if (isMicOnRef.current && !isAIPlayingRef.current && !isListeningRef.current) {
            try {
              recognitionRef.current?.start();
            } catch (_) {}
          }
        }, 300);
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech") {
        // Normal silence cutoff on mobile, trigger debounced restart
        if (isMicOnRef.current && !isAIPlayingRef.current) {
          if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
          restartTimeoutRef.current = setTimeout(() => {
            if (isMicOnRef.current && !isAIPlayingRef.current && !isListeningRef.current) {
              try {
                recognitionRef.current?.start();
              } catch (_) {}
            }
          }, 300);
        }
        return;
      }

      if (event.error === "aborted") {
        return;
      }

      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setMicError("Microphone permission denied. Tap to allow microphone.");
        isListeningRef.current = false;
        setIsListening(false);
        return;
      }

      if (event.error === "audio-capture") {
        setMicError("No microphone found or in use. Tap to retry.");
        isListeningRef.current = false;
        setIsListening(false);
        return;
      }

      if (event.error === "network") {
        if (isMicOnRef.current && !isAIPlayingRef.current) {
          if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
          restartTimeoutRef.current = setTimeout(() => {
            if (isMicOnRef.current && !isAIPlayingRef.current && !isListeningRef.current) {
              try {
                recognitionRef.current?.start();
              } catch (_) {}
            }
          }, 600);
        }
        return;
      }

      console.warn("Speech recognition error:", event.error);
      isListeningRef.current = false;
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
      try {
        recognition.stop();
        recognition.abort();
      } catch (_) {}
      isListeningRef.current = false;
      setIsListening(false);
    };
  }, []);

  const startMic = () => {
    if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
    if (recognitionRef.current && !isListeningRef.current && !isAIPlayingRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn("Mic start notice:", err);
      }
    }
  };

  const stopMic = () => {
    if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
    if (recognitionRef.current) {
      isListeningRef.current = false;
      setIsListening(false);
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
  };

  const toggleMic = async () => {
    if (isMicOn) {
      isMicOnRef.current = false;
      setIsMicOn(false);
      stopMic();
    } else {
      isMicOnRef.current = true;
      setIsMicOn(true);
      setMicError("");
      // Explicit user gesture triggers permission check on mobile browsers
      try {
        if (navigator.mediaDevices?.getUserMedia) {
          const s = await navigator.mediaDevices.getUserMedia({ audio: true });
          s.getTracks().forEach((track) => track.stop());
        }
      } catch (err) {
        console.warn("Microphone access permission notice:", err);
      }
      startMic();
    }
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

  // Ctrl + Enter shortcut handlers
  const submitAnswerRef = useRef(submitAnswer);
  const handleNextRef = useRef(handleNext);
  const feedbackRef = useRef(feedback);
  const isSubmittingRef = useRef(isSubmitting);
  const answerRef = useRef(answer);
  const isIntroPhaseRef = useRef(isintroPhase);

  useEffect(() => {
    submitAnswerRef.current = submitAnswer;
    handleNextRef.current = handleNext;
    feedbackRef.current = feedback;
    isSubmittingRef.current = isSubmitting;
    answerRef.current = answer;
    isIntroPhaseRef.current = isintroPhase;
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (isIntroPhaseRef.current) return;
        if (!feedbackRef.current) {
          if (!isSubmittingRef.current && answerRef.current?.trim()) {
            submitAnswerRef.current?.();
          }
        } else {
          handleNextRef.current?.();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
            {/* Interviewer Avatar Selector */}
            <div className='w-full max-w-md flex items-center justify-between px-1 mb-1'>
              <span className='text-xs font-semibold text-slate-500 dark:text-slate-400'>
                Interviewer:
              </span>
              <div className='flex items-center bg-slate-200/90 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs'>
                <button
                  type='button'
                  onClick={() => switchGender("female")}
                  className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    voiceGender === "female"
                      ? "bg-emerald-600 text-white shadow-xs font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span>👩</span> Sarah (Female)
                </button>
                <button
                  type='button'
                  onClick={() => switchGender("male")}
                  className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    voiceGender === "male"
                      ? "bg-emerald-600 text-white shadow-xs font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span>👨</span> David (Male)
                </button>
              </div>
            </div>

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

                <div className='text-base sm:text-lg font-semibold text-slate-900 dark:white leading-relaxed'>{currentQuestion?.question}</div>
              </div>
            )
          }

          <textarea placeholder='Speak into your microphone or type your answer here...'
            onChange={(e)=>{
              setAnswer(e.target.value);
              finalTranscriptRef.current = e.target.value;
            }}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                e.preventDefault();
                if (!isintroPhase && !feedback && !isSubmitting && answer.trim()) {
                  submitAnswer();
                }
              }
            }}
            value={answer}
            className='flex-1 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition min-h-40'
          />

          {!feedback ? (
            <div className='flex flex-wrap items-center gap-3 sm:gap-4 mt-6'>
              {/* Mic button with pulsing glow & active audio wave bars */}
              <div className='relative flex items-center justify-center'>
                {/* Outer pulsing ping rings when mic is on and user can speak */}
                {isMicOn && !isAIPlaying && (
                  <>
                    <span className='absolute -inset-2 rounded-full bg-emerald-400/30 animate-ping pointer-events-none' />
                    <span className='absolute -inset-1 rounded-full bg-teal-400/40 animate-pulse pointer-events-none' />
                  </>
                )}

                <motion.button 
                  type='button'
                  onClick={toggleMic}
                  whileTap={{ scale: 0.9 }}
                  animate={isMicOn && !isAIPlaying ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                  transition={isMicOn && !isAIPlaying ? { repeat: Infinity, duration: 1.4 } : {}}
                  className={`relative z-10 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl text-white shadow-xl transition-all duration-300 cursor-pointer ${
                    isMicOn 
                      ? "bg-linear-to-r from-emerald-500 to-teal-500 shadow-emerald-500/50 hover:brightness-110" 
                      : "bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-white border border-slate-300 dark:border-slate-600 shadow-slate-900/40"
                  }`}
                  title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
                >
                  {isMicOn ? <FaMicrophone size={20}/> : <FaMicrophoneSlash size={20}/>}
                </motion.button>
              </div>

              {/* Listening Live Audio Visualizer bars - VISIBLE ON BOTH MOBILE & DESKTOP */}
              {isMicOn && !isAIPlaying && (
                <div 
                  onClick={toggleMic}
                  className='flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 px-3.5 py-2.5 rounded-2xl shadow-xs cursor-pointer select-none'
                >
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
                  <span className='text-xs font-semibold text-emerald-700 dark:text-emerald-300 tracking-wide'>
                    Listening... Speak now
                  </span>
                </div>
              )}

              {!isMicOn && !isAIPlaying && (
                <div 
                  onClick={toggleMic}
                  className='flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-2.5 rounded-2xl text-xs font-medium text-slate-600 dark:text-slate-400 cursor-pointer'
                >
                  <FaMicrophoneSlash size={14} className='text-slate-400' />
                  <span>Mic Paused (Tap to Speak)</span>
                </div>
              )}

              {micError && (
                <div 
                  onClick={toggleMic}
                  className='flex items-center gap-1.5 bg-red-50 dark:bg-red-500/20 border border-red-200 dark:border-red-500/30 px-3.5 py-2.5 rounded-2xl text-xs font-medium text-red-600 dark:text-red-400 cursor-pointer animate-pulse'
                >
                  <span>⚠️ {micError}</span>
                </div>
              )}

              <motion.button 
                onClick={submitAnswer}
                disabled={isSubmitting || !answer.trim()}
                whileTap={{ scale: 0.96 }}
                className='flex-1 min-w-35 bg-emerald-600 hover:bg-emerald-500 text-white py-3 sm:py-4 px-4 rounded-2xl shadow-lg shadow-emerald-600/20 dark:shadow-emerald-950/40 transition font-semibold disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2'
              >
                <span>{isSubmitting ? "Submitting..." : "Submit Answer"}</span>
                <kbd className='hidden sm:inline-flex items-center text-[11px] font-mono font-medium px-2 py-0.5 rounded-lg bg-black/20 dark:bg-white/15 border border-white/20 text-white/90'>Ctrl + ↵</kbd>
              </motion.button>
            </div>
          ) : (
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='mt-6 bg-emerald-50/60 dark:bg-slate-900/90 border border-emerald-200 dark:border-emerald-500/40 p-5 rounded-2xl shadow-xs'>
              <p className='text-emerald-800 dark:text-emerald-300 font-medium mb-4 leading-relaxed'>{feedback}</p>

              <button 
              onClick={handleNext}
              className='w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 sm:py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2 font-semibold cursor-pointer'>
                <span>{currentIndex + 1 >= questions.length ? "Finish Interview" : "Next Question"}</span>
                <kbd className='hidden sm:inline-flex items-center text-[11px] font-mono font-medium px-2 py-0.5 rounded-lg bg-black/20 dark:bg-white/15 border border-white/20 text-white/90'>Ctrl + ↵</kbd>
                <BsArrowRight size={18}/>
              </button>
            </motion.div>
          )}

        </div>


      </div>

    </div>
  )
}

export default Step2Interview