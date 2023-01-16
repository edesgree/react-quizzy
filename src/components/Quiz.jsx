import React from 'react';
import Question from './Question';

export default function Quiz(props) {
  const [quiz, setQuiz] = React.useState([]);
  console.log('quiz', quiz);

  React.useEffect(() => {
    // get quiz from API
    fetch('https://opentdb.com/api.php?amount=1')
      .then((res) => res.json())
      .then((data) => {
        const quizElements = data.results;
        console.log('data.results', data.results);
        setQuiz(quizElements);
      });
    console.log('i fire once');
  }, []);
  function mergeAnswers(correct_answer, incorrect_answers) {
    let allAnswers = [];
    allAnswers = incorrect_answers;
    allAnswers.push(correct_answer);
    console.log('allAnswers1', allAnswers);
    return allAnswers;
  }
  return (
    <section className="quiz">
      <div className="quiz-questions">
        {quiz.map((item) => {
          console.log('item', item.question);

          return (
            <Question
              key={item}
              question={item.question}
              correct_answer={item.correct_answer}
              incorrect_answer={item.incorrect_answers}
              all_answers={mergeAnswers(
                item.correct_answer,
                item.incorrect_answers
              )}
            />
          );
        })}
        ****************************
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
      </div>
      <footer className="quiz-footer">
        <button className="primary">Check answers</button>
        <p>You scored 3/5 correct answers</p>
      </footer>
    </section>
  );
}
