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

/**
 * @param map 2048 맵
 * @returns map이 가득 차있으면 true 리턴.
 */
export const isAllTruthyElements = (map: Map2048): boolean => {
  return map.every((row) => row.every((cell) => Boolean(cell)));
};

/**
 * @param map 2048 맵
 * @returns 움직일 수 있는 방향이 하나라도 있으면 true 리턴.
 */
export const canMove = (map: Map2048): boolean => {
  const allDirections: Direction[] = ['up', 'down', 'left', 'right'];
  return allDirections.some((d) => moveMapIn2048Rule(map, d).isMoved);
};

/**
 *
 * @param map 2048 맵
 * @returns 비어있는 랜덤한 위치에 2를 생성한다.
 */
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

/**
 * 맵 초기값
 */
export const initMap2048: Map2048 = [
  [null, null, null, null],
  [null, 4, null, 2],
  [null, null, null, null],
  [null, null, null, null],
];

interface CellPosition {
  rowIdx: number;
  colIdx: number;
}
