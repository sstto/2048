import { useEffect } from 'react';

import type { Direction } from '../components/Types';

export const useArrowKeyPress = (callback: (direction: Direction) => void) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const direction = getDirectionFromKey(e.key);
      if (direction !== null) {
        callback(direction);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [callback]);
};

function getDirectionFromKey(key: string): Direction | null {
  switch (key) {
    case 'ArrowUp':
      return 'up';
    case 'ArrowDown':
      return 'down';
    case 'ArrowLeft':
      return 'left';
    case 'ArrowRight':
      return 'right';
    default:
      return null;
  }
}
