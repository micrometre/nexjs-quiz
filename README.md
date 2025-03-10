# Quiz App

This is a Quiz App built with Next.js and Prisma. It allows users to take quizzes and calculates their scores based on their answers.

## Features

- Fetch all quizzes with questions and answers
- Submit quiz answers and calculate scores

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/micrometre/nexjs-quiz.git
    cd nexjs-quiz
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the database:
    ```bash
    npx prisma migrate dev --name init
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## API Endpoints

### GET /api/quizzes

Fetch all quizzes with their questions and answers.

#### Response
```json
[
  {
    "id": 1,
    "title": "Sample Quiz",
    "questions": [
      {
        "id": 1,
        "text": "Sample Question?",
        "answers": [
          { "id": 1, "text": "Answer 1", "isCorrect": false },
          { "id": 2, "text": "Answer 2", "isCorrect": true }
        ]
      }
    ]
  }
]
```

### POST /api/quizzes

Submit quiz answers and calculate the score

#### Request
```json
{
  "quizId": 1,
  "answers": {
    "1": 2
  }
}
```

#### Response
```json
{
  "score": 1,
  "total": 1
}
```

## License

This project is licensed under the MIT License.
