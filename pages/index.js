"use client";
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false)

  // Fetch quizzes from the API

  useEffect(() => {
    fetch('/api/quizzes')
      .then((res) => res.json())
      .then((data) => setQuizzes(data));
  }, []);

  // Handle answer selection
  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));

    // Check if the selected answer is correct
    const currentQuestion = selectedQuiz.questions.find((q) => q.id === questionId);
    const selectedAnswer = currentQuestion.answers.find((a) => a.id === answerId);
    setIsAnswerCorrect(selectedAnswer.isCorrect);
  };

  // Handle quiz submission
  const handleSubmit = async (quizId) => {
    const response = await fetch('/api/quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId, answers: selectedAnswers }),
    });

    const result = await response.json();
    setScore(result);
  };

  // Navigate to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedQuiz.questions.length - 1 && isAnswerCorrect) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswerCorrect(false); // Reset for the next question
    }
  };

  // Navigate to the previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setIsAnswerCorrect(false)
    }
  };

  // Start a quiz
  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(null);
    setIsAnswerCorrect(false);
    setShowResult(false)

  };



  if (!selectedQuiz) {
    return (
      <Layout>


        <div className=" mt-10 p-6 bg-gray-50 min-h-screen">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Quizzes</h1>
          <div className="container m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">

            <ul className="space-y-4">
              {quizzes.slice(0, 1).map((quiz) => (
                <li key={quiz.id}>
                  <button
                    onClick={() => startQuiz(quiz)}
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

                  >
                    {quiz.title}
                  </button>
                </li>
              ))}
            </ul>
            <ul className="space-y-4">
              {quizzes.slice(1, 2).map((quiz) => (
                <li key={quiz.id}>
                  <button
                    onClick={() => startQuiz(quiz)}
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {quiz.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>

    );
  }

  const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
  return (
    <Layout>
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedQuiz.title}</h1>
        <h2 className="text-xl text-gray-700 mb-6">
          Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
        </h2>
        {/* Display the current question */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{currentQuestion.text}</h3>
        <ul className="space-y-3">
          {currentQuestion.answers.map((answer) => (
            <li key={answer.id}>
              <label className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={answer.id}
                  checked={selectedAnswers[currentQuestion.id] === answer.id}
                  onChange={() => handleAnswerSelect(currentQuestion.id, answer.id)}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700">{answer.text}</span>
              </label>
            </li>
          ))}
        </ul>
        {/* Navigation buttons */}
        <div className="flex space-x-4 mt-6">
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === selectedQuiz.questions.length - 1 || !isAnswerCorrect}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        {/* Submit button (only shown on the last question) */}

        {currentQuestionIndex === selectedQuiz.questions.length - 1 && (
        <button
          onClick={() => handleSubmit(selectedQuiz.id)}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg mt-6 hover:bg-green-600 transition duration-200"
        >
          Submit Quiz
        </button>
      )}
        {/* Display score after submission */}
        {score !== null && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
            <p className="text-xl font-bold text-gray-800">
              Your score: {score.score} out of {score.total}
            </p>
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
}







