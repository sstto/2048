export type Cell = number | null;
export type Map2048 = Cell[][];
export type Direction = 'up' | 'left' | 'right' | 'down';
export interface GameState {
  isEnd: boolean;
  message: string;
  map2048: Map2048;
  lastGameState: GameState | null;
}
