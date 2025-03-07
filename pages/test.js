import { useEffect, useState } from 'react';

export default function Home() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch('/api/quizzes')
      .then((res) => res.json())
      .then((data) => setQuizzes(data));
  }, []);

  return (
    <div>
      <h1>Quizzes</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <h2>{quiz.title}</h2>
            <ul>
              {quiz.questions.map((question) => (
                <li key={question.id}>
                  <h3>{question.text}</h3>
                  <ul>
                    {question.answers.map((answer) => (
                      <li key={answer.id}>
                        {answer.text} {answer.isCorrect ? '(Correct)' : ''}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}