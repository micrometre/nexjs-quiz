import { useState, useEffect } from 'react';

export default function Home() {
  const [quizzes, setQuizzes] = useState([]);
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

  // Handle form submission
  const handleSubmit = async (quizId) => {
    const response = await fetch('/api/quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizId, answers: selectedAnswers }),
    });

    const result = await response.json();
    setScore(result);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Quizzes</h1>
      {quizzes.map((quiz) => (
        <div key={quiz.id} style={{ marginBottom: '40px' }}>
          <h2>{quiz.title}</h2>
          {quiz.questions.map((question) => (
            <div key={question.id} style={{ marginBottom: '20px' }}>
              <h3>{question.text}</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {question.answers.map((answer) => (
                  <li key={answer.id}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={answer.id}
                        onChange={() => handleAnswerSelect(question.id, answer.id)}
                      />
                      {answer.text}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button onClick={() => handleSubmit(quiz.id)}>Submit Quiz</button>
        </div>
      ))}

      {score !== null && (
        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
          <p>Your score: {score.score} out of {score.total}</p>
        </div>
      )}
    </div>
  );
}