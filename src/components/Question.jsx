import React from 'react';

function Question(props) {
  return (
    <div className="question">
      <h2 className="question-title">How would one say goodbye in Spanish?</h2>
      <div className="question-answers">
        <button className={`answer ${props.state}`}>Adiós</button>
        <button className={`answer ${props.state}`}>Hola</button>
        <button className={`answer ${props.state}`}>Au Revoir</button>
        <button className={`answer ${props.state}`}>Salir</button>
      </div>
    </div>
  );
}
export default Question;
