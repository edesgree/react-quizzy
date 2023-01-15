import React from 'react';

export default function Intro(props) {
  return (
    <div>
      <p>Let's play</p>
      <button className="primary" onClick={props.start}>
        Start Quiz
      </button>
    </div>
  );
}
