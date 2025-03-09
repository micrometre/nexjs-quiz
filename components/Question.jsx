import React from 'react';

const Question = ({ currentQuestion, selectedAnswers, handleAnswerSelect }) => {
  return (
    <div>
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
    </div>
  );
};

export default Question;