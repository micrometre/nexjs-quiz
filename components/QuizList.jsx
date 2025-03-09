import React from 'react';

const QuizList = ({ quizzes, startQuiz }) => {
  return (
    <div className="mt-10 p-6 bg-gray-50 min-h-screen">
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
  );
};

export default QuizList;