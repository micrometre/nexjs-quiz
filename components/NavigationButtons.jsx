import { React } from 'react';

const NavigationButtons = ({
  currentQuestionIndex,
  totalQuestions,
  isAnswerCorrect,
  handlePreviousQuestion,
  handleNextQuestion,
}) => {
  return (
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
        disabled={currentQuestionIndex === totalQuestions - 1 || !isAnswerCorrect}
        className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default NavigationButtons;