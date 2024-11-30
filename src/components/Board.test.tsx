import { describe, expect, it } from 'vitest';

import { calculateNextGameState } from './Board';
import type { GameState } from './Types';

const initialGameState: GameState = {
  isEnd: false,
  message: '',
  map2048: [
    [null, 2, null, 4],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
  lastGameState: null,
};
describe('calculateNextGameState', () => {
  it('should return null if the game is already ended', () => {
    const gameState: GameState = {
      ...initialGameState,
      isEnd: true,
    };
    const result = calculateNextGameState('left', gameState);
    expect(result).toBeNull();
  });

  it('should move and merge tiles correctly to the left', () => {
    const gameState: GameState = {
      isEnd: false,
      message: '',
      map2048: [
        [2, 2, 4, 4],
        [2, null, 2, null],
        [null, 4, 4, 8],
        [16, 16, null, 32],
      ],
      lastGameState: null,
    };

    const result = calculateNextGameState('left', gameState, false);
    expect(result).not.toBeNull();
    expect(result?.map2048).toEqual([
      [4, 8, null, null],
      [4, null, null, null],
      [8, 8, null, null],
      [32, 32, null, null],
    ]);
  });

  it('should move and merge tiles correctly to the right', () => {
    const gameState: GameState = {
      isEnd: false,
      message: '',
      map2048: [
        [2, 2, 4, 4],
        [2, null, 2, null],
        [null, 4, 4, 8],
        [16, 16, null, 32],
      ],
      lastGameState: null,
    };

    const result = calculateNextGameState('right', gameState, false);
    expect(result).not.toBeNull();
    expect(result?.map2048).toEqual([
      [null, null, 4, 8],
      [null, null, null, 4],
      [null, null, 8, 8],
      [null, null, 32, 32],
    ]);
  });

  it('should move and merge tiles correctly upwards', () => {
    const gameState: GameState = {
      isEnd: false,
      message: '',
      map2048: [
        [2, null, 4, 4],
        [2, 4, 4, 8],
        [null, null, 8, 8],
        [16, 4, null, 16],
      ],
      lastGameState: null,
    };

    const result = calculateNextGameState('up', gameState, false);
    expect(result).not.toBeNull();
    expect(result?.map2048).toEqual([
      [4, 8, 8, 4],
      [16, null, 8, 16],
      [null, null, null, 16],
      [null, null, null, null],
    ]);
  });

  it('should move and merge tiles correctly downwards', () => {
    const gameState: GameState = {
      isEnd: false,
      message: '',
      map2048: [
        [2, null, 4, 4],
        [2, 4, 4, 8],
        [null, null, 8, 8],
        [16, 4, null, 16],
      ],
      lastGameState: null,
    };

    const result = calculateNextGameState('down', gameState, false);
    expect(result).not.toBeNull();
    expect(result?.map2048).toEqual([
      [null, null, null, null],
      [null, null, null, 4],
      [4, null, 8, 16],
      [16, 8, 8, 16],
    ]);
  });

  it('should detect win condition when a tile reaches 128', () => {
    const gameState: GameState = {
      ...initialGameState,
      map2048: [
        [64, 64, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };
    const result = calculateNextGameState('left', gameState);
    expect(result).toEqual(
      expect.objectContaining({
        isEnd: true,
        message: 'You Win!',
      }),
    );
  });

  it('should detect game over condition when the board is full and no moves are possible', () => {
    const gameState: GameState = {
      ...initialGameState,
      map2048: [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 2, 4, 2],
      ],
    };
    const result = calculateNextGameState('left', gameState);
    expect(result).toEqual(
      expect.objectContaining({
        isEnd: true,
        message: 'Game Over!',
      }),
    );
  });

  it('should not move tiles if no moves are possible in the given direction', () => {
    const gameState: GameState = {
      ...initialGameState,
      map2048: [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 2, 4, 2],
      ],
    };
    const result = calculateNextGameState('up', gameState);
    expect(result?.map2048).toEqual(gameState.map2048);
  });
});
