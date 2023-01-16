import React from 'react';
import Question from './Question';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';

export default function Quiz(props) {
  const [quiz, setQuiz] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [quizCompleted, setQuizCompleted] = React.useState(false);

  function fetchData() {
    // get quiz from API
    fetch('https://opentdb.com/api.php?amount=4')
      .then((res) => res.json())
      .then((data) => {
        // set current quiz with result from api
        setQuiz(data.results);
        setLoading(false);
        console.log('quiz', quiz);
        console.log('data.results', data.results);
      });
  }
  React.useEffect(() => {
    fetchData();
    console.log('i fire once');
  }, []);

  function mergeAnswers(correct_answer, incorrect_answers) {
    let allAnswers = incorrect_answers.concat(correct_answer);
    return allAnswers;
  }
  function handleFinalCheck(event) {
    event.preventDefault();
  }
  function HTMLdecode(string) {
    return { __html: string };
  }
  return (
    <section className="quiz">
      {loading ? (
        'loading...'
      ) : (
        <div className="quiz-questions">
          {quiz.map((item) => {
            console.log('item', item.question);
            item.choice = 'toto';

            return (
              <Question
                key={nanoid()}
                question={decode(item.question)}
                correct_answer={item.correct_answer}
                incorrect_answers={item.incorrect_answers}
                all_answers={mergeAnswers(
                  item.correct_answer,
                  item.incorrect_answers
                )}
                user_choice=""
              />
            );
          })}
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
        <button className="primary">Check answers</button>
        <p>You scored 3/5 correct answers</p>
      </footer>
    </section>
  );
}
