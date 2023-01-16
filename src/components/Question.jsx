import React from 'react';
import { nanoid } from 'nanoid';
function Question(props) {
  const [choice, setChoice] = React.useState(props.user_choice);
  function handleChoice(event) {
    event.preventDefault();
    setChoice(event.target.value);
    console.log('my choice is: ', choice);
  }
  console.log('props.all_answers ', props.all_answers);
  const answersElements = props.all_answers?.map((answer) => {
    return (
      <button
        key={nanoid()}
        onClick={handleChoice}
        value={answer}
        className={`answer ${props.state}`}
      >
        {answer}
      </button>
    );
  });
  const wrongElements = props.incorrect_answers?.map((item) => `${item} | `);
  const AllElements = props.all_answers?.map((item) => `${item} | `);
  return (
    <div className="question">
      <h2 className="question-title">{props.question}</h2>
      correct_answer: {props.correct_answer}
      <br />
      wrong answer: {wrongElements}
      <br />
      all answer: {AllElements}
      <br />
      user choice : {choice}
      <div className="question-answers">{answersElements}</div>
    </div>
  );
}
export default Question;
