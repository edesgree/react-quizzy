import React from 'react';
import Question from './Question';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';

export default function Quiz(props) {
  const [quizData, setQuizData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [quizCompleted, setQuizCompleted] = React.useState(false);

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

  function handleFinalCheck(event) {
    event.preventDefault();
    console.log('check answers');
  }
  const questionsElements = quizData.map((item) => {
    console.log('item', item.question);
    item.choice = 'toto';

    return (
      <Question
        key={nanoid()}
        question={item.question}
        correct_answer={item.correct_answer}
        incorrect_answers={item.incorrect_answers}
        all_answers={item.all_answers}
        user_choice=""
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
        <button className="primary" onClick={handleFinalCheck}>
          Check answers
        </button>
        <p>You scored 3/5 correct answers</p>
      </footer>
    </section>
  );
}
