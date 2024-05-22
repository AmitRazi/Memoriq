export const parseResponse = (text) => {
  const lines = text.split("\n");
  const questionsArray = [];
  let currentQuestion = null;
  let currentAnswer = "";
  let index = 0;

  lines.forEach((line) => {
    if (line.startsWith("Q:")) {
      if (currentQuestion) {
        questionsArray.push({
          question: currentQuestion,
          answer: currentAnswer,
          index: index++,
          isCorrect: false,
        });
      }
      currentQuestion = line.trim();
      currentAnswer = "";
    } else {
      currentAnswer += line + "\n";
    }
  });

  if (currentQuestion) {
    questionsArray.push({
      question: currentQuestion,
      answer: currentAnswer,
      index: index,
      isCorrect: false,
    });
  }

  return questionsArray;
};

export const promptQuestionsGenerator = (text) => {
  return `Write 15 questions from this prompt: ${text}. Answer in the following format:
  Q: question
  A: Answer
  
  Do not write anything else in your response`;
};

export const promptSingleQuestionGenerator = (query, question) => {
  return `I have these questions: ${query}. I want to change this one: ${question}.
  Provide a new question ON THE SAME TOPIC AS THE OTHER QUESTIONS and do so in the following format:
  Q: question
  A: Answer
  
  Do not write anything else in your response`;
};
