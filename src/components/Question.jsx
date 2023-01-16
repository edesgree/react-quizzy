import React from 'react';

function Question(props) {
  console.log('props.all_answers ', props.all_answers);
  const answersElements = props.all_answers?.map((answer) => {
    return <button className={`answer ${props.state}`}>{answer}</button>;
  });
  return (
    <div className="question">
      <h2 className="question-title">{props.question}</h2>
      correct_answer: {props.correct_answer}
      <br />
      wrong answer: {props.incorrect_answer}
      <br />
      allanswer: {props.all_answers}
      <br />
      <div className="question-answers">{answersElements}</div>
    </div>
  );
}
export default Question;
