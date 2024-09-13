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
      const { result, isMoved } = moveMapIn2048Rule(
        gameState.map2048,
        direction,
      );
      const resultAfterSpawn = isMoved ? spawnRandomly(result) : result;
      if (containsNumberAbove(128, resultAfterSpawn)) {
        setGameState({
          isEnd: true,
          message: 'You Win!',
          map2048: resultAfterSpawn,
        });
      } else if (
        isAllTruthyElements(resultAfterSpawn) &&
        !canMove(resultAfterSpawn)
      ) {
        setGameState({
          isEnd: true,
          message: 'Game Over!',
          map2048: resultAfterSpawn,
        });
      } else {
        setGameState({ ...gameState, map2048: resultAfterSpawn });
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
