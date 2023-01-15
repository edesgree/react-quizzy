import React from 'react';
import Question from './Question';

export default function Quiz(props) {
  return (
    <section className="quiz">
      <div className="quiz-questions">
        <Question state="" />
        <Question state="desactive" />
        <Question state="desactive correct" />
        <Question state="desactive wrong" />
        <Question state="active" />
      </div>
      <footer className="quiz-footer">
        <button className="primary">Check answers</button>
        <p>You scored 3/5 correct answers</p>
      </footer>
    </section>
  );
}
