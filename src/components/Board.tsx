import { useCallback, useState } from 'react';

import { useArrowKeyPress } from '../hooks/UseArrowKeyPress';
import { moveMapIn2048Rule } from '../utils/logic';
import type { Cell, Direction, Map2048 } from './Types';

function Tile({ value }: TileProps) {
  const tileClass =
    value !== null && value !== 0 ? `tile tile-${value}` : 'tile empty';
  return <div className={tileClass}>{value}</div>;
}

function Board({ map2048, setMap2048 }: BoardProps) {
  const [isEnd, SetIsEnd] = useState<boolean>();

  const move = useCallback(
    (direction: Direction) => {
      const { result, isMoved } = moveMapIn2048Rule(map2048, direction);
      const resultAfterSpawn = isMoved ? spawn(result) : result;
      if (
        resultAfterSpawn.every((row) =>
          row.every((cell) => cell !== 0 && cell !== null),
        )
      ) {
        console.log('full');
      }
      setMap2048(resultAfterSpawn);
    },
    [map2048, setMap2048],
  );

  useArrowKeyPress(move);

  return (
    <div className="board">
      {map2048.map((row, rowIdx) =>
        row.map((value, colIdx) => (
          <Tile key={`${rowIdx}-${colIdx}`} value={value} />
        )),
      )}
    </div>
  );
}

const spawn = (map: Map2048) => {
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

interface TileProps {
  value: Cell;
}

interface BoardProps {
  map2048: Map2048;
  setMap2048: React.Dispatch<React.SetStateAction<Map2048>>;
}

export default Board;
