import GameButton from './GameButton';
import type { GameState } from './Types';

function Prompt({ gameState, resetGame }: PromptProps) {
  return (
    <>
      {gameState.isEnd && (
        <div className="game-over-overlay">
          <div className="game-over-message">
            <div>{gameState.message}</div>
            <GameButton label="Try Again" onClick={resetGame} />
          </div>
        </div>
      )}
    </>
  );
}

interface PromptProps {
  gameState: GameState;
  resetGame: () => void;
}

export default Prompt;
