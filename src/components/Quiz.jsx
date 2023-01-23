import React from 'react';
import Question from './Question';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';

export default function Quiz(props) {
  const [quizData, setQuizData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [quizCompleted, setQuizCompleted] = React.useState(false);
  const [totalScore, setTotalScore] = React.useState(0);
  const nbQuestions = 5;

  const fetchData = async () => {
    const res = await fetch('https://opentdb.com/api.php?amount=4');
    const data = await res.json();

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
    setQuizData(customData);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchData();
    console.log('i fire once');
  }, []);
  const randomizeAnswers = (arr) => arr.sort(() => Math.random() - 0.5);

  // check if answers are correct or not
  function handleFinalCheck(event) {
    event.preventDefault();
    console.log('check answers');
  }

  // restart game
  function handleRestart() {
    //
  }
  // update quizData to show what the user chose
  function handleUserChoice(id, selectedAnswer) {
    setQuizData((prevQuizData) =>
      prevQuizData.map((data) => {
        return data.id === id ? { ...data, user_choice: selectedAnswer } : data;
      })
    );
    console.log('handle user choice:', quizData);
  }
  // question elements rendering
  const questionsElements = quizData.map((item) => {
    console.log('item', item.question);
    item.choice = 'toto';

    return (
      <Question
        key={item.id}
        id={item.id}
        question={item.question}
        correct_answer={item.correct_answer}
        incorrect_answers={item.incorrect_answers}
        all_answers={item.all_answers}
        handleUserChoice={handleUserChoice}
      />
    );
  });
  return (
    <section className="quiz">
      {loading ? (
        'loading...'
      ) : (
        <div className="quiz-questions">
          {questionsElements}
          ****************************
          {/*
        <Question
          question="How would one say goodbye in Spanish?"
          correct_answer="answer 1"
          incorrect_answers={['answer 2', 'answer 3']}
          all_answers={['answer 1', 'answer 2', 'answer 3']}
          state=""
        />
        <Question
          question="How would one say goodbye in Spanish?"
          correct_answer="answer 1"
          incorrect_answers={['answer 2', 'answer 3']}
          all_answers={['answer 1', 'answer 2', 'answer 3']}
          state="desactive"
        />
        <Question
          question="How would one say goodbye in Spanish?"
          correct_answer="answer 1"
          incorrect_answers={['answer 2', 'answer 3']}
          all_answers={['answer 1', 'answer 2', 'answer 3']}
          state="desactive correct"
        />
        <Question
          question="How would one say goodbye in Spanish?"
          correct_answer="answer 1"
          incorrect_answers={['answer 2', 'answer 3']}
          all_answers={['answer 1', 'answer 2', 'answer 3']}
          state="desactive wrong"
        />
        <Question
          question="How would one say goodbye in Spanish?"
          correct_answer="answer 1"
          incorrect_answers={['answer 2', 'answer 3']}
          all_answers={['answer 1', 'answer 2', 'answer 3']}
          state="active"
        /> 
        */}
        </div>
      )}
      <footer className="quiz-footer">
        {!quizCompleted && (
          <button className="primary" onClick={handleFinalCheck}>
            Check answers
          </button>
        )}
        {quizCompleted && (
          <div>
            <button className="primary" onClick={handleRestart}>
              Start new game
            </button>
            <p>
              You scored {totalScore}/{nbQuestions} correct answers
            </p>
          </div>
        )}
      </footer>
    </section>
  );
}
