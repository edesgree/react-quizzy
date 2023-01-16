import React from 'react';
import { nanoid } from 'nanoid';
function Question(props) {
  const [choice, setChoice] = React.useState('');
  const [active, setActive] = React.useState(false);
  const [correct, setCorrect] = React.useState(false);
  function handleChoice(event) {
    event.preventDefault();
    setChoice(event.target.value);
    console.log('my choice is: ', choice);
    setCorrect(checkCorrectAnswer(event.target.value, props.correct_answer));
    console.log('my choice is: ', correct);
  }

  React.useEffect(() => {
    console.log('click');
  }, [choice]);
  function checkCorrectAnswer(choice, correct_answer) {
    return choice === correct_answer;
  }
  console.log('props.all_answers ', props.all_answers);
  const answersElements = props.all_answers?.map((answer) => {
    return (
      <button
        key={nanoid()}
        onClick={handleChoice}
        value={answer}
        className={choice === answer ? 'active' : ''}
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
      user choice : {choice} | answer is {correct ? 'good' : 'wrong'}
      <div className="question-answers">{answersElements}</div>
    </div>
  );
}
export default Question;
