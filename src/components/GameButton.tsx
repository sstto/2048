interface GameButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function GameButton({ label, onClick, disabled = false }: GameButtonProps) {
  return (
    <button className="game-button" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

export default GameButton;
