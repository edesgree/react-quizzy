import React from 'react';

import Intro from './components/Intro';
import Quiz from './components/Quiz';

function App() {
  const [gameStart, setGameStart] = React.useState(false);
  function startGame() {
    setGameStart(true);
  }
  return (
    <main className="App">
      <header>
        <h1>Quizzy</h1>
      </header>
      {!gameStart && <Intro start={startGame} />}
      {gameStart && <Quiz />}
    </main>
  );
}

export default App;
