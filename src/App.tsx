import './App.css';

import { useState } from 'react';

import Board from './components/Board';
import GameButton from './components/GameButton';
import Prompt from './components/Prompt';
import type { GameState } from './components/Types';
import { initMap2048 } from './utils/common';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    isEnd: false,
    message: '',
    map2048: initMap2048,
    lastGameState: null,
  });

  const resetGame = () => {
    setGameState({
      isEnd: false,
      message: '',
      map2048: initMap2048,
      lastGameState: null,
    });
  };

  const redoGame = () => {
    if (gameState.lastGameState === null) return;
    setGameState({
      ...gameState.lastGameState,
    });
  };

  return (
    <div className="app">
      <div className="game-title">2048/8 GAME</div>
      <div className="game-container">
        <GameButton label="redo" onClick={redoGame} />
        <GameButton label="New Game" onClick={resetGame} />
      </div>
      <Board gameState={gameState} setGameState={setGameState} />
      <Prompt gameState={gameState} resetGame={resetGame} />
    </div>
  );
}

export default App;
