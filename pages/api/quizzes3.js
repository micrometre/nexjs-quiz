import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch all quizzes with questions and answers
    const quizzes = await prisma.quiz.findMany({
      include: { questions: { include: { answers: true } } },
    });
    res.json(quizzes);
  } else if (req.method === 'POST') {
    // Handle quiz submission and calculate score
    const { quizId, answers } = req.body;

    // Fetch the correct answers for the quiz
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: { include: { answers: true } } },
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Calculate the score
    let score = 0;
    quiz.questions.forEach((question) => {
      const correctAnswer = question.answers.find((a) => a.isCorrect);
      const userAnswer = answers[question.id];

      if (correctAnswer && userAnswer === correctAnswer.id) {
        score += 1;
      }
    });

    res.json({ score, total: quiz.questions.length });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}


