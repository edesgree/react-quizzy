import React from 'react';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';

function Question(props) {
  const [choice, setChoice] = React.useState('');
  const [active, setActive] = React.useState(false);
  const [correct, setCorrect] = React.useState(false);
  function handleChoice(event) {
    event.preventDefault();
    setChoice(event.target.value);
    console.log('my choice is: ', choice);
    setCorrect(checkCorrectAnswer(event.target.value, props.correct_answer));
    console.log('my correctness is: ', correct);
    // update quiz object with choice
    props.updateUserChoice(props.id, event.target.value);
  }

  React.useEffect(() => {
    console.log('click');
    console.log('props.quiz_completed', props.quiz_completed);
  }, [choice]);
  function checkCorrectAnswer(choice, correct_answer) {
    return choice === correct_answer;
  }
  console.log('props.all_answers ', props.all_answers);
  const answersElements = props.all_answers?.map((answer) => {
    function getButtonStyle() {
      let style = null;
      if (!props.quiz_completed) {
        if (answer === choice) {
          style = 'active';
        }
      } else {
        style = 'desactive ';
        if (answer === props.correct_answer) {
          style += 'correct';
        } else if (answer === props.user_choice) {
          style += 'wrong';
        } else {
          style += 'not-selected';
        }
      }
      return style;
    }

    return (
      <button
        key={nanoid()}
        onClick={handleChoice}
        value={answer}
        className={getButtonStyle()}
      >
        {decode(answer)}
      </button>
    );
  });
  const AllElements = props.all_answers?.map((item) => `${item} | `);
  return (
    <div className="question">
      <h2 className="question-title">{props.question}</h2>
      correct_answer: {props.correct_answer}
      <br />
      all answer: {AllElements}
      <br />
      user choice : {choice} | answer is {correct ? 'good' : 'wrong'}
      <div className="question-answers">{answersElements}</div>
    </div>
  );
}
export default Question;
