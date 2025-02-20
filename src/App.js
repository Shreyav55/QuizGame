import React, { useState, useEffect } from "react";
import "./App.css";




const quizData = [
  {
    question: "1. Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    answer: "Mercury",
    type: "multiple-choice"
  },
  {
    question: "2. Which data structure organizes items in a FIFO manner?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue",
    type: "multiple-choice"
  },
  {
    question: "3. Which of the following is primarily used for structuring web pages?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: "HTML",
    type: "multiple-choice"
  },
  {
    question: "4. Which chemical symbol stands for Gold?",
    options: ["Au", "Gd", "Ag", "Pt"],
    answer: "Au",
    type: "multiple-choice"
  },
  {
    question: "5. Which of these processes is not typically involved in refining petroleum?",
    options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"],
    answer: "Filtration",
    type: "multiple-choice"
  },
  {
    question: "6. What is the value of 12 + 28?",
    answer: "40",
    type: "numeric"
  },
  {
    question: "7. How many states are there in the United States?",
    answer: "50",
    type: "numeric"
  },
  {
    question: "8. In which year was the Declaration of Independence signed?",
    answer: "1776",
    type: "numeric"
  },
  {
    question: "9. What is the value of pi rounded to the nearest integer?",
    answer: "3",
    type: "numeric"
  },
  {
    question: "10. If a car travels at 60 mph for 2 hours, how many miles does it travel?",
    answer: "120",
    type: "numeric"
  }
];
const QuizApp = () => {
  const [step, setStep] = useState("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [, setSelectedOption] = useState(null);
  const [numericAnswer, setNumericAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [attemptHistory, setAttemptHistory] = useState([]);
  const [historyDetails, ] = useState([]);
  

  useEffect(() => {
    if (step === "quiz" && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setStep("result");
    }
  }, [step, timeLeft]);

  const handleStart = () => setStep("instructions");
  const handleNext = () => {
    setStep("quiz");
    setTimeLeft(30);
  };

  const handleAnswer = (option) => {
    setSelectedOption(option);
    if (option === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      nextQuestion(option === quizData[currentQuestion].answer);
    }, 1000);
  };

  const handleNumericAnswer = () => {
    if (numericAnswer === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
    nextQuestion(numericAnswer === quizData[currentQuestion].answer);
  };

  const nextQuestion = async (isCorrect) => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setNumericAnswer("");
      setTimeLeft(30);
    } else {
      const quizAttempt = { score, details: historyDetails };
      
      setAttemptHistory([...attemptHistory, quizAttempt]);
      setStep("result");
    }
  };
  
  
  const restartQuiz = () => {
    setStep("start");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setNumericAnswer("");
    setTimeLeft(30);
  };
  return (
   <div className="quiz-container">
       {step === "start" && (
    <div >
       <img src="/image.jpg" alt="" className="quiz-image" />
    </div>
  )}

     {step === "start" && 
         
       <button className="startbtn" onClick={handleStart}>Start Quiz</button>}
    
      {step === "instructions" && (
        <div className="Instruction">
          <h2 className="Instruction-heading">Quiz Instructions</h2>
          <p >1. Each question has 30 seconds to answer.</p>
          
          <p>2. Your score will be shown at the end.</p>
          <p>3. For integer-type questions, write your numerical answer clearly</p>
          <p>4. No calculators unless specified.</p>
          <button className="Instructionbtn" onClick={handleNext}>Next</button>
          </div>
        
       
      )}
       {step === "quiz" && (
        <div className="Question">
          <h2 className="question">{quizData[currentQuestion].question}</h2>
          <div className="time">Time Left: {timeLeft}s</div>
          {quizData[currentQuestion].type === "multiple-choice" ? (
            quizData[currentQuestion].options.map((option) => (
              <button className="options" key={option} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))
          ) : (
            <input
              type="number"
              value={numericAnswer}
              onChange={(e) => setNumericAnswer(e.target.value)}
            />
          )}
          {quizData[currentQuestion].type === "numeric" && (
            <button onClick={handleNumericAnswer}>Submit</button>
          )}
        </div>
      )}
      {step === "result" && (
        <div className="Score">
          <h2 className="score-heading">Quiz Completed!</h2>
          <p>Your Score: {score}/{quizData.length}</p>
          <button onClick={restartQuiz}>Start Again</button>
          
         

        </div>
      )}
       </div>
  );
};

export default QuizApp;