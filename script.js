const main_card = document.querySelector('.main-card');

// Quiz Questions
const quizQuestions = [
  {
    question: "What is my favorite thing about you?",
    options: ["Your smile", "Your eyes", "Your kindness", "Everything"],
    correctAnswer: 3,
  },
  {
    question: "What is the first thing I noticed about you?",
    options: ["Your laugh", "Your eyes", "Your intelligence", "Your vibe"],
    correctAnswer: 3,
  },
  {
    question: "What do I usually do when I’m stressed?",
    options: [
      "Talk to you",
      "Listen to music",
      "Go for a walk",
      "Sleep",
    ],
    correctAnswer: 0,
  },
  {
    question: "When is my birthday?",
    options: ["January 14", "March 14", "July 20", "May 6"],
    correctAnswer: 0, 
  },
  {
    question: "What’s one thing I admire about you the most?",
    options: [
      "Your confidence",
      "Your caring nature",
      "Your determination",
      "All of the above",
    ],
    correctAnswer: 3,
  },
];

let currentQuestionIndex = 0;
let score = 0;

window.addEventListener('DOMContentLoaded', first_page);

function first_page() {
  main_card.innerHTML = "";

  let card = document.createElement('div');
  card.className = "card";

  let card_header = document.createElement('h5');
  card_header.className = "card-header";
  card_header.innerHTML = "Quiz Game";

  let card_body = document.createElement('div');
  card_body.className = "card-body";

  let card_title = document.createElement('h5');
  card_title.className = "card-title";
  card_title.innerHTML = "Instructions";

  let card_text_1 = document.createElement('p');
  card_text_1.className = "card-text";
  card_text_1.innerHTML = "1. If you want to submit Quiz, click on the submit button.";

  let card_text_2 = document.createElement('p');
  card_text_2.className = "card-text";
  card_text_2.innerHTML = "2. Just click on an answer option to submit the question's answer.";

  let start_quiz_btn = document.createElement('a');
  start_quiz_btn.className = "btn btn-primary";
  start_quiz_btn.setAttribute("id", "start-quiz-btn");
  start_quiz_btn.innerHTML = "Start Quiz";

  card_body.appendChild(card_title);
  card_body.appendChild(card_text_1);
  card_body.appendChild(card_text_2);
  card_body.appendChild(start_quiz_btn);

  card.appendChild(card_header);
  card.appendChild(card_body);

  main_card.appendChild(card);

  start_quiz_btn.addEventListener('click', () => loadQuestion(currentQuestionIndex));
}

function timmerClock(duration, updateCallback, endCallback) {
  let time = duration;
  const timer = setInterval(() => {
    if (time <= 0) {
      clearInterval(timer);
      if (endCallback) endCallback();
    } else {
      time--;
      if (updateCallback) updateCallback(time);
    }
  }, 1000);
}

function loadQuestion(index) {
  main_card.innerHTML = "";

  const questionData = quizQuestions[index];

  let card = document.createElement("div");
  card.className = "card";

  let timmer_clock = document.createElement("div");
  timmer_clock.className = "timmer-clock";

  let span_timmer_clock = document.createElement("span");
  span_timmer_clock.className = "span-timmer-clock";
  timmer_clock.appendChild(span_timmer_clock);

  let card_body = document.createElement("div");
  card_body.className = "card-body";
  card_body.innerHTML = questionData.question;

  let feedback = document.createElement("p");
  feedback.className = "feedback";
  feedback.style.color = "blue";
  feedback.style.marginTop = "10px";

  let btn_group_vertical = document.createElement("div");
  btn_group_vertical.className = "btn-group-vertical";

  questionData.options.forEach((option, i) => {
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.className = "btn btn-primary";
    button.innerText = option;

    button.addEventListener("click", () => {
      handleAnswerSelection(i, questionData.correctAnswer, feedback, button);
    });

    btn_group_vertical.appendChild(button);
  });

  let btn_section = document.createElement("div");
  btn_section.className = "btn-section";

  let btn_primary = document.createElement("button");
  btn_primary.className = "btn btn-primary";
  btn_primary.innerHTML = "Next";

  btn_primary.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      loadQuestion(currentQuestionIndex);
    } else {
      displayQuizResults();
    }
  });

  btn_section.appendChild(btn_primary);

  card.appendChild(timmer_clock);
  card.appendChild(card_body);
  card.appendChild(btn_group_vertical);
  card.appendChild(feedback);
  card.appendChild(btn_section);

  main_card.appendChild(card);

  // Start the timer
  timmerClock(
    10,
    (time) => {
      span_timmer_clock.innerText = `Time left: ${time}s`;
    },
    () => {
      alert("your Time is up You have to restart Test")
      first_page();
    }
  );
}

function handleAnswerSelection(selectedIndex, correctIndex, feedback, button) {
  if (selectedIndex === correctIndex) {
    feedback.innerText = "Correct answer!";
    feedback.style.color = "green";
    score++;
  } else {
    feedback.innerText = "Wrong answer!";
    feedback.style.color = "red";
  }

  // Disable all buttons after answering
  const buttons = button.parentElement.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));
}

function displayQuizResults() {
  main_card.innerHTML = "";

  let card = document.createElement("div");
  card.className = "card";

  let card_body = document.createElement("div");
  card_body.className = "card-body";

  let result_title = document.createElement("h5");
  result_title.className = "card-title";
  result_title.innerHTML = "Quiz Completed!";

  let result_text = document.createElement("p");
  result_text.className = "card-text";
  result_text.innerHTML = `Your score is ${score} out of ${quizQuestions.length}.`;

  let restart_btn = document.createElement("a");
  restart_btn.className = "btn btn-primary";
  restart_btn.innerHTML = "Restart Quiz";
  restart_btn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    first_page();
  });

  card_body.appendChild(result_title);
  card_body.appendChild(result_text);
  card_body.appendChild(restart_btn);

  card.appendChild(card_body);
  main_card.appendChild(card);
}
