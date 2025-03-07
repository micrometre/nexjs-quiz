import { useState, useEffect } from 'react';

export default function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

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
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Navigate to the previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Start a quiz
  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(null);
  };

  if (!selectedQuiz) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Quizzes</h1>
        <ul className="space-y-4">
          {quizzes.map((quiz) => (
            <li key={quiz.id}>
              <button
                onClick={() => startQuiz(quiz)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                {quiz.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const currentQuestion = selectedQuiz.questions[currentQuestionIndex];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedQuiz.title}</h1>
      <h2 className="text-xl text-gray-700 mb-6">
        Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
      </h2>
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
          disabled={currentQuestionIndex === selectedQuiz.questions.length - 1}
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {currentQuestionIndex === selectedQuiz.questions.length - 1 && (
        <button
          onClick={() => handleSubmit(selectedQuiz.id)}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg mt-6 hover:bg-green-600 transition duration-200"
        >
          Submit Quiz
        </button>
      )}

      {score !== null && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
          <p className="text-xl font-bold text-gray-800">
            Your score: {score.score} out of {score.total}
          </p>
        </div>
      )}
    </div>
  );
}