import React from 'react';
import Question from './Question';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';

export default function Quiz(props) {
  const [quizData, setQuizData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [quizCompleted, setQuizCompleted] = React.useState(false);
  const [gameStart, setGameStart] = React.useState(false);
  const [totalScore, setTotalScore] = React.useState(0);
  const nbQuestions = 5;

  const fetchData = async () => {
    // get questions from API
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${nbQuestions}`
    );
    const data = await res.json();

    // store data in a custom object
    const customData = [];
    data.results.forEach((item) => {
      customData.push({
        id: nanoid(),
        all_answers: randomizeAnswers([
          item.correct_answer,
          ...item.incorrect_answers
        ]),
        question: decode(item.question),
        correct_answer: item.correct_answer,
        user_correct: false,
        user_choice: null
      });
    });
    // set Quiz Data with this custom object
    setQuizData(customData);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData();
    console.log('i fire once');

    console.log('quizCompleted', quizCompleted);
  }, []);
  const randomizeAnswers = (arr) => arr.sort(() => Math.random() - 0.5);

  // check if answers are correct or not
  function handleFinalCheck(event) {
    event.preventDefault();
    setQuizCompleted(true);
    console.log('check answers');
    console.log('quizCompleted end', quizCompleted);
    let currentScore = 0;
    quizData.forEach((question) => {
      console.log('question', question);
      console.log('question.correct_answer', question.correct_answer);
      console.log('question.user_choice', question.user_choice);
      if (question.correct_answer === question.user_choice) {
        currentScore += 1;
        question.user_correct = true;
      }
    });
    setTotalScore(currentScore);
    console.log('quizdata', quizData);
  }

  // restart game
  function handleRestart() {
    props.start;
    setQuizCompleted((prevState) => !prevState);
    setLoading(true);
    setTotalScore(0);
    fetchData();
  }
  // update quizData to show what the user chose
  function updateUserChoice(id, selectedAnswer) {
    setQuizData((prevQuizData) =>
      prevQuizData.map((data) => {
        return data.id === id ? { ...data, user_choice: selectedAnswer } : data;
      })
    );
    console.log('handle user choice:', quizData);
  }
  // question elements rendering
  const questionsElements = quizData.map((item) => {
    return (
      <Question
        key={item.id}
        id={item.id}
        question={item.question}
        correct_answer={item.correct_answer}
        all_answers={item.all_answers}
        updateUserChoice={updateUserChoice}
        user_choice={item.user_choice}
        quiz_completed={quizCompleted}
      />
    );
  });
  return (
    <section className="quiz">
      {loading ? (
        'loading...'
      ) : (
        <div>
          <div className="quiz-questions">{questionsElements}</div>

          <footer className="quiz-footer">
            {!quizCompleted && (
              <button className="primary" onClick={handleFinalCheck}>
                Check answers
              </button>
            )}
            {quizCompleted && (
              <div>
                <p>
                  You scored {totalScore}/{nbQuestions} correct answers
                </p>
                <button className="primary" onClick={handleRestart}>
                  Start new game
                </button>
              </div>
            )}
          </footer>
        </div>
      )}
    </section>
  );
}
