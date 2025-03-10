const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ruleOfLawQuiz = {
  title: "What does the rule of law mean in the UK?",
  questions: [
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
      text: "Who is responsible for enforcing the law in the UK?",
      answers: [
        { text: "The Prime Minister", isCorrect: false },
        { text: "The police", isCorrect: true },
        { text: "The monarchy", isCorrect: false },
        { text: "The NHS", isCorrect: false }
      ]
    },
    {
      text: "What is the role of judges in the UK legal system?",
      answers: [
        { text: "To make new laws", isCorrect: false },
        { text: "To enforce the law", isCorrect: false },
        { text: "To interpret and apply the law", isCorrect: true },
        { text: "To represent the government", isCorrect: false }
      ]
    },
    {
      text: "What is the significance of the Magna Carta in the UK legal system?",
      answers: [
        { text: "It established the NHS", isCorrect: false },
        { text: "It limited the power of the monarchy and laid the foundation for the rule of law", isCorrect: true },
        { text: "It created the first Parliament", isCorrect: false },
        { text: "It introduced the concept of the welfare state", isCorrect: false }
      ]
    },
    {
      text: "What is the purpose of the rule of law in the UK?",
      answers: [
        { text: "To ensure everyone pays taxes", isCorrect: false },
        { text: "To maintain order and protect individual rights", isCorrect: true },
        { text: "To enforce strict laws", isCorrect: false },
        { text: "To require everyone to vote", isCorrect: false }
      ]
    }
  ]
};

async function main() {
  const quiz = await prisma.quiz.create({
    data: {
      title: ruleOfLawQuiz.title,
      questions: {
        create: ruleOfLawQuiz.questions.map((q) => ({
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