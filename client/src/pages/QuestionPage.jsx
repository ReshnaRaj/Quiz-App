import React, { useEffect, useState, useMemo } from "react";
import Header from "@/components/Header";
import RightSidebar from "@/components/RightSidebar";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { GoCheckCircle } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { fetchQuestion, saveResultToDatabase } from "../../api/auth";
import { useSelector } from "react-redux";
import QuestionSkeleton from "@/components/QuestionSkeleton";

const QuestionPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userId = user.id;

  const [questionArr, setQuestionArr] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(() =>
    parseInt(localStorage.getItem("quiz_current_index") || "0", 10)
  );
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [answers, setAnswers] = useState(() =>
    JSON.parse(localStorage.getItem("quiz_answers") || "{}")
  );
  const [finalizedAnswers, setFinalizedAnswers] = useState(() =>
    JSON.parse(localStorage.getItem("quiz_finalized") || "{}")
  );

  const progress = useMemo(() => ((currentIndex + 1) / 10) * 100, [currentIndex]);
  const currentQuestion = questionArr[currentIndex];
  const isDisabled = finalizedAnswers[currentIndex] === true;

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await fetchQuestion();
        setQuestionArr(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadQuestions();
  }, []);

  useEffect(() => {
    localStorage.setItem("quiz_answers", JSON.stringify(answers));
    localStorage.setItem("quiz_finalized", JSON.stringify(finalizedAnswers));
    localStorage.setItem("quiz_current_index", currentIndex.toString());
  }, [answers, finalizedAnswers, currentIndex]);

  const handleOptionSelect = (questionIndex, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const handleNext = () => {
    if (answers.hasOwnProperty(currentIndex)) {
      setFinalizedAnswers((prev) => ({
        ...prev,
        [currentIndex]: true,
      }));
    }

    if (currentIndex < questionArr.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const goToQuestion = (index) => setCurrentIndex(index);

  const calculateScore = () => {
    return questionArr.reduce((score, q, i) => {
      return answers[i] === q.answer ? score + 5 : score;
    }, 0);
  };

  const handleSubmit = async () => {
    if (!hasSubmitted) {
      setHasSubmitted(true);
      const score = calculateScore();
      await saveResultToDatabase({ userId, score });
      navigate("/result", { state: { userId, score } });
    }
  };

  if (!questionArr.length || !currentQuestion) {
    return <div className="text-center mt-10"><QuestionSkeleton /></div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <h2 className="text-center text-[28px] font-bold text-[#2A586F]">
        Assess Your <span className="relative inline-block">
            <span className="bg-[#f5c45a] absolute inset-x-0 bottom-1 sm:bottom-1 md:bottom-2 h-2 z-0  "></span>
            <span className="relative z-10">Intelligence</span>
          </span>
      </h2>

      {/* Toggle Sidebar Button */}
      <button onClick={toggleSidebar} className="ml-5 cursor-pointer" aria-label="Toggle Sidebar">
        <svg width="29" height="29" viewBox="0 0 29 29" fill="none">
          <path
            d="M10.8748 26.5833H18.1248C24.1665 26.5833 26.5832 24.1667 26.5832 18.125V10.875C26.5832 4.83334 24.1665 2.41667 18.1248 2.41667H10.8748C4.83317 2.41667 2.4165 4.83334 2.4165 10.875V18.125C2.4165 24.1667 4.83317 26.5833 10.8748 26.5833Z"
            stroke="#5C5C5C"
            strokeWidth="3.02"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.0835 2.41667V26.5833"
            stroke="#5C5C5C"
            strokeWidth="3.02"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.0835 14.5H26.5835"
            stroke="#5C5C5C"
            strokeWidth="3.02"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row p-4 gap-6">
        <div className="w-full md:w-52">
          {sidebarOpen && (
            <RightSidebar
              isOpen={sidebarOpen}
              answers={answers}
              currentIndex={currentIndex}
              goToQuestion={goToQuestion}
            />
          )}
        </div>

        <div className="flex-1 flex flex-col gap-5">
          {/* Progress */}
          <div className="flex justify-between items-center">
            <Progress value={progress} className="w-[80%]" />
            <span className="text-sm font-medium">{currentIndex + 1}/10</span>
            <span className="bg-[#FAC167] text-yellow-800 text-xs font-medium px-2 py-1 rounded sm:text-base  sm:ml-3 whitespace-nowrap">
              ⏱ 5 Min
            </span>
          </div>

          {/* Question Box */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#2A586F] text-white rounded-full flex items-center justify-center font-semibold">
                {currentIndex + 1}
              </div>
              <p className="text-base font-semibold">{currentQuestion.question}</p>
            </div>

            <RadioGroup
              className="space-y-3"
              value={answers[currentIndex]}
              onValueChange={(value) =>
                !isDisabled && handleOptionSelect(currentIndex, value)
              }
            >
              {currentQuestion.options.map((option, index) => {
                const isSelected = answers[currentIndex] === option;

                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 border rounded hover:bg-gray-50 ${
                      isSelected
                        ? "bg-green-100 border-green-500"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center">
                      <RadioGroupItem
                        value={option}
                        id={`option-${index}`}
                        disabled={isDisabled}
                        className="border-gray-300 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-100"
                      />
                      <label
                        htmlFor={`option-${index}`}
                        className={`ml-2 text-sm font-medium ${
                          isDisabled ? "text-gray-400" : ""
                        }`}
                      >
                        {option}
                      </label>
                    </div>
                    {isSelected && <GoCheckCircle className="w-5 h-5 text-green-600" />}
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end mt-4">
            {currentIndex > 0 && (
              <Button
                onClick={handlePrevious}
                className="bg-[#2A586F] text-white hover:bg-[#234859] mr-2"
              >
                ← Previous
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="bg-[#2A586F] text-white hover:bg-[#234859]"
            >
              {currentIndex === questionArr.length - 1 ? "Submit" : "Next →"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
