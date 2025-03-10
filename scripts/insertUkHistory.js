const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const historyQuiz = {
  title: "A Long and Illustrious History",
  questions: [
    {
      text: "Who was the first Tudor king of England?",
      answers: [
        { text: "Henry VII", isCorrect: true },
        { text: "Henry VIII", isCorrect: false },
        { text: "Edward VI", isCorrect: false },
        { text: "Richard III", isCorrect: false }
      ]
    },
    {
      text: "What was the significance of the Magna Carta?",
      answers: [
        { text: "It established the Church of England", isCorrect: false },
        { text: "It limited the power of the monarchy and laid the foundation for the rule of law", isCorrect: true },
        { text: "It created the first Parliament", isCorrect: false },
        { text: "It introduced the concept of the welfare state", isCorrect: false }
      ]
    },
    {
      text: "Which event marked the beginning of the Industrial Revolution in the UK?",
      answers: [
        { text: "The invention of the steam engine", isCorrect: true },
        { text: "The signing of the Magna Carta", isCorrect: false },
        { text: "The Battle of Hastings", isCorrect: false },
        { text: "The founding of the NHS", isCorrect: false }
      ]
    },
    {
      text: "Who was the Prime Minister of the UK during World War II?",
      answers: [
        { text: "Winston Churchill", isCorrect: true },
        { text: "Neville Chamberlain", isCorrect: false },
        { text: "Clement Attlee", isCorrect: false },
        { text: "Margaret Thatcher", isCorrect: false }
      ]
    },
    {
      text: "What was the main outcome of the Battle of Hastings in 1066?",
      answers: [
        { text: "The Normans conquered England", isCorrect: true },
        { text: "The Vikings conquered England", isCorrect: false },
        { text: "The Romans conquered England", isCorrect: false },
        { text: "The Anglo-Saxons conquered England", isCorrect: false }
      ]
    }
  ]
};

async function main() {
  const quiz = await prisma.quiz.create({
    data: {
      title: historyQuiz.title,
      questions: {
        create: historyQuiz.questions.map((q) => ({
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