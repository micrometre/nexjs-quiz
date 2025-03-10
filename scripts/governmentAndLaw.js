const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const governmentAndLawQuiz = {
  title: "The UK Government, the Law, and Your Role",
  questions: [
    {
      text: "What is the role of the Prime Minister in the UK?",
      answers: [
        { text: "To represent the country at international events", isCorrect: false },
        { text: "To lead the government and make decisions on national policy", isCorrect: true },
        { text: "To enforce the law", isCorrect: false },
        { text: "To manage the National Health Service (NHS)", isCorrect: false }
      ]
    },
    {
      text: "What is the name of the UK's law-making body?",
      answers: [
        { text: "The House of Commons", isCorrect: false },
        { text: "The House of Lords", isCorrect: false },
        { text: "Parliament", isCorrect: true },
        { text: "The Supreme Court", isCorrect: false }
      ]
    },
    {
      text: "What is the minimum voting age in the UK?",
      answers: [
        { text: "16", isCorrect: false },
        { text: "18", isCorrect: true },
        { text: "21", isCorrect: false },
        { text: "25", isCorrect: false }
      ]
    },
    {
      text: "What is the role of the police in the UK?",
      answers: [
        { text: "To make laws", isCorrect: false },
        { text: "To enforce the law and maintain order", isCorrect: true },
        { text: "To interpret the law", isCorrect: false },
        { text: "To represent the government", isCorrect: false }
      ]
    },
    {
      text: "What is the name of the UK's highest court?",
      answers: [
        { text: "The High Court", isCorrect: false },
        { text: "The Crown Court", isCorrect: false },
        { text: "The Supreme Court", isCorrect: true },
        { text: "The Court of Appeal", isCorrect: false }
      ]
    }
  ]
};

async function main() {
  const quiz = await prisma.quiz.create({
    data: {
      title: governmentAndLawQuiz.title,
      questions: {
        create: governmentAndLawQuiz.questions.map((q) => ({
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