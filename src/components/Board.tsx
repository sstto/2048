import React, { useCallback } from 'react';

import { useArrowKeyPress } from '../hooks/UseArrowKeyPress';
import {
  canMove,
  containsNumberAbove,
  isAllTruthyElements,
  spawnRandomly,
} from '../utils/common';
import { moveMapIn2048Rule } from '../utils/core_logics';
import type { Cell, Direction, GameState } from './Types';

function Tile({ value }: TileProps) {
  const tileClass =
    value !== null && value !== 0 ? `tile tile-${value}` : 'tile empty';
  return <div className={tileClass}>{value}</div>;
}

function Board({ gameState, setGameState }: BoardProps) {
  const move = useCallback(
    (direction: Direction) => {
      if (gameState.isEnd) return;
      const { result, isMoved } = moveMapIn2048Rule(
        gameState.map2048,
        direction,
      );
      const resultAfterSpawn = isMoved ? spawnRandomly(result) : result;
      if (containsNumberAbove(128, resultAfterSpawn)) {
        // 128 완성했을 때
        setGameState({
          isEnd: true,
          message: 'You Win!',
          map2048: resultAfterSpawn,
          lastGameState: { ...gameState },
        });
      } else if (
        // 모든 Cell이 가득 차있고 움직일 수 없을 때
        isAllTruthyElements(resultAfterSpawn) &&
        !canMove(resultAfterSpawn)
      ) {
        setGameState({
          isEnd: true,
          message: 'Game Over!',
          map2048: resultAfterSpawn,
          lastGameState: { ...gameState },
        });
      } else {
        setGameState({
          ...gameState,
          map2048: resultAfterSpawn,
          lastGameState: { ...gameState },
        });
      }
    },
    [gameState, setGameState],
  );

  useArrowKeyPress(move);

  return (
    <div className={`board ${gameState.isEnd ? 'faded' : ''}`}>
      {gameState.map2048.map((row, rowIdx) =>
        row.map((value, colIdx) => (
          <Tile key={`${rowIdx}-${colIdx}`} value={value} />
        )),
      )}
    </div>
  );
}

interface TileProps {
  value: Cell;
}

interface BoardProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export default Board;
