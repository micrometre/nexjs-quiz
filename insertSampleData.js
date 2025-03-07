const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sampleQuiz = {
  title: "General Knowledge Quiz",
  questions: [
    {
      text: "What is the capital of France?",
      answers: [
        { text: "Paris", isCorrect: true },
        { text: "London", isCorrect: false },
        { text: "Berlin", isCorrect: false },
        { text: "Madrid", isCorrect: false }
      ]
    },
    {
      text: "Which planet is known as the Red Planet?",
      answers: [
        { text: "Earth", isCorrect: false },
        { text: "Mars", isCorrect: true },
        { text: "Jupiter", isCorrect: false },
        { text: "Saturn", isCorrect: false }
      ]
    },
    {
      text: "Who wrote 'To Kill a Mockingbird'?",
      answers: [
        { text: "Harper Lee", isCorrect: true },
        { text: "Mark Twain", isCorrect: false },
        { text: "J.K. Rowling", isCorrect: false },
        { text: "Ernest Hemingway", isCorrect: false }
      ]
    },
    {
      text: "What is the largest ocean on Earth?",
      answers: [
        { text: "Atlantic Ocean", isCorrect: false },
        { text: "Indian Ocean", isCorrect: false },
        { text: "Arctic Ocean", isCorrect: false },
        { text: "Pacific Ocean", isCorrect: true }
      ]
    },
    {
      text: "Which element has the chemical symbol 'O'?",
      answers: [
        { text: "Oxygen", isCorrect: true },
        { text: "Gold", isCorrect: false },
        { text: "Iron", isCorrect: false },
        { text: "Silver", isCorrect: false }
      ]
    }
  ]
};

async function main() {
  const quiz = await prisma.quiz.create({
    data: {
      title: sampleQuiz.title,
      questions: {
        create: sampleQuiz.questions.map((q) => ({
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
  console.log(`Created quiz with id: ${quiz.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });