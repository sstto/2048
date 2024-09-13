import './App.css';

import { useState } from 'react';

import Board from './components/Board';
import type { GameState, Map2048 } from './components/Types';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    isEnd: false,
    message: '',
  });

  const [map2048, setMap2048] = useState<Map2048>([
    [null, null, null, null],
    [null, 4, null, 2],
    [null, null, null, null],
    [null, null, null, null],
  ]);

  return (
    <div className="app">
      <Board
        map2048={map2048}
        setMap2048={setMap2048}
        gameState={gameState}
        setGameState={setGameState}
      />
      {gameState.isEnd && (
        <div className="game-over-overlay">
          <div className="game-over-message">
            <div>{gameState.message}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
