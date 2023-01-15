import react from 'react';
import Question from './components/Question';

function App() {
  return (
    <main className="App">
      <h1>Quizzy</h1>
      <p>Let's play</p>
      <button
        className="primary"
        onClick={() => setCount((count) => count + 1)}
      >
        Start Quiz
      </button>

      <div className="quiz">
        <Question state="" />
        <Question state="desactive" />
        <Question state="desactive correct" />
        <Question state="desactive wrong" />
        <Question state="active" />
      </div>
      <button className="primary">Check answers</button>
      <p>You scored 3/5 correct answers</p>
    </main>
  );
}

export default App;
