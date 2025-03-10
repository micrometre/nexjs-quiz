import React from 'react';
import ResponsiveCard from './ResponsiveCard';



const QuizList = ({ quizzes, startQuiz }) => {
  return (

    <div className="container">
      <div className="container m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {quizzes.map((quiz) => (
          <ResponsiveCard key={quiz.id} quiz={quiz} startQuiz={startQuiz} />
        ))}
      </div>
    </div>
  );
};

export default QuizList;