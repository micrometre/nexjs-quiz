import { useState } from 'react';
import { React } from 'react';

import Question from './Question';
import NavigationButtons from './NavigationButtons';
import Result from './Result';

const Quiz = ({ selectedQuiz, handleSubmit, score, setSelectedQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [liveScore, setLiveScore] = useState(0); // State to track the live score

  const currentQuestion = selectedQuiz.questions[currentQuestionIndex];

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));

    const currentQuestion = selectedQuiz.questions.find((q) => q.id === questionId);
    const selectedAnswer = currentQuestion.answers.find((a) => a.id === answerId);
    setIsAnswerCorrect(selectedAnswer.isCorrect);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedQuiz.questions.length - 1 && isAnswerCorrect) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswerCorrect(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setIsAnswerCorrect(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedQuiz.title}</h1>
      <h2 className="text-xl text-gray-700 mb-6">
        Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
      </h2>
      <Question
        currentQuestion={currentQuestion}
        selectedAnswers={selectedAnswers}
        handleAnswerSelect={handleAnswerSelect}
      />
      <NavigationButtons
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={selectedQuiz.questions.length}
        isAnswerCorrect={isAnswerCorrect}
        handlePreviousQuestion={handlePreviousQuestion}
        handleNextQuestion={handleNextQuestion}
      />
      {currentQuestionIndex === selectedQuiz.questions.length - 1 && (
        <button
          onClick={() => handleSubmit(selectedQuiz.id, selectedAnswers)}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg mt-6 hover:bg-green-600 transition duration-200"
        >
          Submit Quiz
        </button>
      )}
      {score !== null && <Result score={score} setSelectedQuiz={setSelectedQuiz} />}
    </div>
  );
};

export default Quiz;