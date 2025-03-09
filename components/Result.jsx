import React from 'react';

const Result = ({ score, setSelectedQuiz }) => {
  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
      <p className="text-xl font-bold text-gray-800">
        Your score: {score.score} out of {score.total}
      </p>
      <button
        onClick={() => setSelectedQuiz(null)}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Back to Quizzes
      </button>
    </div>
  );
};

export default Result;