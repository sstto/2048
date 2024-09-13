import type { Direction, Map2048 } from '../components/Types';
import { moveMapIn2048Rule } from './core_logics';

/**
 * @param n 임계 숫자
 * @param map 2048 맵
 * @returns n 이상의 숫자가 map에 하나라도 있으면 true를 리턴.
 */
export const containsNumberAbove = (n: number, map: Map2048): boolean => {
  return map.some((row) => row.some((value) => value !== null && value >= n));
};

export const isAllTruthyElements = (map: Map2048): boolean => {
  return map.every((row) => row.every((cell) => Boolean(cell)));
};

export const canMove = (map: Map2048): boolean => {
  const allDirections: Direction[] = ['up', 'down', 'left', 'right'];
  return allDirections.some((d) => moveMapIn2048Rule(map, d).isMoved);
};

export const spawnRandomly = (map: Map2048): Map2048 => {
  const emptyCells: CellPosition[] = [];
  map.forEach((row, rowIdx) => {
    row.forEach((value, colIdx) => {
      if (value === null || value === 0) {
        emptyCells.push({ rowIdx: rowIdx, colIdx: colIdx });
      }
    });
  });
  if (emptyCells.length === 0) {
    return map;
  }
  const randomIdx = Math.floor(Math.random() * emptyCells.length);
  const { rowIdx: randomRowIdx, colIdx: randomColIdx } = emptyCells[
    randomIdx
  ] as CellPosition;
  return map.map((row, rowIndex) =>
    row.map((cell, colIndex) =>
      rowIndex === randomRowIdx && colIndex === randomColIdx ? 2 : cell,
    ),
  );
};

interface CellPosition {
  rowIdx: number;
  colIdx: number;
}
