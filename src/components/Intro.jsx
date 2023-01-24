import React from 'react';

export default function Intro(props) {
  return (
    <div>
      <p>Let's play a random trivia!</p>
      <button className="primary" onClick={props.start}>
        Start Quiz
      </button>
    </div>
  );
}
