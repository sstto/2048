import './App.css';

import { useState } from 'react';

import Board from './components/Board';
import GameButton from './components/GameButton';
import Prompt from './components/Prompt';
import type { GameState } from './components/Types';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    isEnd: false,
    message: '',
    map2048: [
      [null, null, null, null],
      [null, 4, null, 2],
      [null, null, null, null],
      [null, null, null, null],
    ],
  });

  const resetGame = () => {
    setGameState({
      isEnd: false,
      message: '',
      map2048: [
        [null, null, null, null],
        [null, 4, null, 2],
        [null, null, null, null],
        [null, null, null, null],
      ],
    });
  };

  return (
    <div className="app">
      <GameButton label="New Game" onClick={resetGame} />
      <Board gameState={gameState} setGameState={setGameState} />
      <Prompt gameState={gameState} resetGame={resetGame} />
    </div>
  );
}

export default App;
