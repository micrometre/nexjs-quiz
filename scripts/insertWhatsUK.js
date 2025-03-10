const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const whatIsTheUKQuiz = {
  title: "What is the UK?",
  questions: [
    {
      text: "Which of the following is a country in the UK?",
      answers: [
        { text: "Ireland", isCorrect: false },
        { text: "Scotland", isCorrect: true },
        { text: "France", isCorrect: false },
        { text: "Germany", isCorrect: false }
      ]
    },
    {
      text: "What is the capital city of England?",
      answers: [
        { text: "Edinburgh", isCorrect: false },
        { text: "Cardiff", isCorrect: false },
        { text: "London", isCorrect: true },
        { text: "Belfast", isCorrect: false }
      ]
    },
    {
      text: "Which of the following is a major landmark in the UK?",
      answers: [
        { text: "The Eiffel Tower", isCorrect: false },
        { text: "The Statue of Liberty", isCorrect: false },
        { text: "Stonehenge", isCorrect: true },
        { text: "The Great Wall of China", isCorrect: false }
      ]
    },
    {
      text: "What is the name of the sea that separates the UK from mainland Europe?",
      answers: [
        { text: "The Atlantic Ocean", isCorrect: false },
        { text: "The North Sea", isCorrect: false },
        { text: "The English Channel", isCorrect: true },
        { text: "The Mediterranean Sea", isCorrect: false }
      ]
    },
    {
      text: "Which of the following is a Crown Dependency of the UK?",
      answers: [
        { text: "Isle of Man", isCorrect: true },
        { text: "Ireland", isCorrect: false },
        { text: "France", isCorrect: false },
        { text: "Germany", isCorrect: false }
      ]
    }
  ]
};

async function main() {
  const quiz = await prisma.quiz.create({
    data: {
      title: whatIsTheUKQuiz.title,
      questions: {
        create: whatIsTheUKQuiz.questions.map((q) => ({
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