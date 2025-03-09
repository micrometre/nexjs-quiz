const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const valuesAndPrinciplesQuiz = {
  title: "The Values and Principles of the UK",
  questions: [
    {
      text: "What is one of the fundamental principles of British values?",
      answers: [
        { text: "Democracy", isCorrect: true },
        { text: "Monarchy", isCorrect: false },
        { text: "Taxation", isCorrect: false },
        { text: "Healthcare", isCorrect: false }
      ]
    },
    {
      text: "What does the rule of law mean in the UK?",
      answers: [
        { text: "Everyone is above the law", isCorrect: false },
        { text: "Everyone must follow the law, including the government", isCorrect: true },
        { text: "Only certain people need to follow the law", isCorrect: false },
        { text: "Laws are optional for citizens", isCorrect: false }
      ]
    },
    {
      text: "Which of the following is an example of individual liberty in the UK?",
      answers: [
        { text: "The right to vote", isCorrect: false },
        { text: "The right to practice any religion", isCorrect: true },
        { text: "The obligation to pay taxes", isCorrect: false },
        { text: "The requirement to serve on a jury", isCorrect: false }
      ]
    },
    {
      text: "What is the role of the monarchy in the UK?",
      answers: [
        { text: "To make new laws", isCorrect: false },
        { text: "To represent the country at international events", isCorrect: true },
        { text: "To manage the National Health Service (NHS)", isCorrect: false },
        { text: "To control the economy", isCorrect: false }
      ]
    },
    {
      text: "What is the importance of mutual respect in British society?",
      answers: [
        { text: "It ensures everyone pays taxes", isCorrect: false },
        { text: "It helps people live together peacefully", isCorrect: true },
        { text: "It requires everyone to vote", isCorrect: false },
        { text: "It enforces strict laws", isCorrect: false }
      ]
    }
  ]
};

async function main() {
  const quiz = await prisma.quiz.create({
    data: {
      title: valuesAndPrinciplesQuiz.title,
      questions: {
        create: valuesAndPrinciplesQuiz.questions.map((q) => ({
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