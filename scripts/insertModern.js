const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const modernSocietyQuiz = {
  title: "A Modern, Thriving Society",
  questions: [
    {
      text: "What is the official language of the UK?",
      answers: [
        { text: "English", isCorrect: true },
        { text: "French", isCorrect: false },
        { text: "German", isCorrect: false },
        { text: "Spanish", isCorrect: false }
      ]
    },
    {
      text: "Which of the following is a major religion in the UK?",
      answers: [
        { text: "Christianity", isCorrect: true },
        { text: "Hinduism", isCorrect: false },
        { text: "Islam", isCorrect: false },
        { text: "Buddhism", isCorrect: false }
      ]
    },
    {
      text: "What is the name of the UK's national healthcare system?",
      answers: [
        { text: "NHS", isCorrect: true },
        { text: "WHO", isCorrect: false },
        { text: "CDC", isCorrect: false },
        { text: "UNICEF", isCorrect: false }
      ]
    },
    {
      text: "Which of the following is a popular sport in the UK?",
      answers: [
        { text: "Football", isCorrect: true },
        { text: "Baseball", isCorrect: false },
        { text: "Basketball", isCorrect: false },
        { text: "Cricket", isCorrect: false }
      ]
    },
    {
      text: "What is the name of the UK's national broadcaster?",
      answers: [
        { text: "BBC", isCorrect: true },
        { text: "CNN", isCorrect: false },
        { text: "Fox News", isCorrect: false },
        { text: "Al Jazeera", isCorrect: false }
      ]
    }
  ]
};

async function main() {
  const quiz = await prisma.quiz.create({
    data: {
      title: modernSocietyQuiz.title,
      questions: {
        create: modernSocietyQuiz.questions.map((q) => ({
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