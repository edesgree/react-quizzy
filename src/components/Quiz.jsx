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
  function mergeAnswers(string, array) {
    const allAnswers = array.push(string);
    console.log('allAnswers', allAnswers);
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
              all_answers={mergeAnswers(
                item.correct_answer,
                item.incorrect_answer
              )}
            />
          );
        })}
        ****************************
        <Question
          question="How would one say goodbye in Spanish?"
          correct_answer="correct_answer"
          state=""
        />
        <Question
          question="How would one say goodbye in Spanish?"
          correct_answer="correct_answer"
          state="desactive"
        />
        <Question
          question="How would one say goodbye in Spanish?"
          correct_answer="correct_answer"
          state="desactive correct"
        />
        <Question
          question="How would one say goodbye in Spanish?"
          correct_answer="correct_answer"
          state="desactive wrong"
        />
        <Question
          question="How would one say goodbye in Spanish?"
          correct_answer="correct_answer"
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
