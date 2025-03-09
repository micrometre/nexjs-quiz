"use client";
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import QuizList from '../components/QuizList';
import Quiz from '../components/Quiz';

export default function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [score, setScore] = useState(null);

  // Fetch quizzes from the API
  useEffect(() => {
    fetch('/api/quizzes')
      .then((res) => res.json())
      .then((data) => setQuizzes(data));
  }, []);

  // Start a quiz
  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setScore(null);
  };

  // Handle quiz submission
  const handleSubmit = async (quizId, selectedAnswers) => {
    const response = await fetch('/api/quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId, answers: selectedAnswers }),
    });

    const result = await response.json();
    setScore(result);
  };

  return (
    <Layout>
      {!selectedQuiz ? (
        <QuizList quizzes={quizzes} startQuiz={startQuiz} />
      ) : (
        <Quiz
          selectedQuiz={selectedQuiz}
          handleSubmit={handleSubmit}
          score={score}
          setSelectedQuiz={setSelectedQuiz}
        />
      )}
    </Layout>
  );
}