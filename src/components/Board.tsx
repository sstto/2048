import React, { useCallback } from 'react';

import { useArrowKeyPress } from '../hooks/UseArrowKeyPress';
import {
  canMove,
  containsNumberAbove,
  isMapFull,
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
      const nextGameState = calculateNextGameState(direction, gameState);
      if (nextGameState != null) {
        setGameState((prevState) => ({
          ...prevState,
          ...nextGameState,
        }));
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

const calculateNextGameState = (
  direction: Direction,
  gameState: GameState,
): Partial<GameState> | null => {
  if (gameState.isEnd) return null;

  const { result, isMoved } = moveMapIn2048Rule(gameState.map2048, direction);
  const resultAfterSpawn = isMoved ? spawnRandomly(result) : result;

  if (containsNumberAbove(128, resultAfterSpawn)) {
    // 승리 조건
    return {
      isEnd: true,
      message: 'You Win!',
      map2048: resultAfterSpawn,
      lastGameState: { ...gameState },
    };
  }

  if (
    // 패배 조건
    isMapFull(resultAfterSpawn) &&
    !canMove(resultAfterSpawn)
  ) {
    return {
      isEnd: true,
      message: 'Game Over!',
      map2048: resultAfterSpawn,
      lastGameState: { ...gameState },
    };
  }

  // 게임 진행 중
  return {
    map2048: resultAfterSpawn,
    lastGameState: { ...gameState },
  };
};

interface TileProps {
  value: Cell;
}

interface BoardProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export default Board;
