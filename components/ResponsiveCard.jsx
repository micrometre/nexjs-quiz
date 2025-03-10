import React from 'react';
import Image from 'next/image';

const ResponsiveCard = ({ quiz, startQuiz }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
      {/* Quiz Image */}
      {/* Quiz Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {quiz.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {quiz.description || "Test your knowledge with this quiz!"}
        </p>
        <button
          onClick={() => startQuiz(quiz)}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default ResponsiveCard;