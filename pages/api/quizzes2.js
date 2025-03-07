import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const quizzes = await prisma.quiz.findMany({
      include: { questions: { include: { answers: true } } },
    });
    res.json(quizzes);
  } else if (req.method === 'POST') {
    const { title, questions } = req.body;
    const quiz = await prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map((q) => ({
            text: q.text,
            answers: {
              create: q.answers.map((a) => ({
                text: a.text,
                isCorrect: a.isCorrect,
              })),
            },
          })),
        },
      },
    });
    res.json(quiz);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}