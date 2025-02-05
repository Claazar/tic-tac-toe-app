import React, { useState, useEffect } from 'react';
import Square from './Square.tsx';

interface BoardProps {
  gameMode: "human" | "bot";
}

const Board: React.FC<BoardProps> = ({ gameMode }) => {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index: number) => {
    if (calculateWinner(squares) || squares[index] || (gameMode === "bot" && !isXNext)) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index: number) => {
    return <Square value={squares[index]} onClick={() => handleClick(index)} />;
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : (squares.includes(null) ? `Next player: ${isXNext ? 'X' : 'O'}` : "It's a draw!");

  // Bot's move logic
  useEffect(() => {
    if (gameMode === "bot" && !isXNext && !winner && squares.includes(null)) {
      // Simulate bot move after a short delay
      setTimeout(() => {
        const emptyIndices = squares
          .map((square, index) => (square === null ? index : -1))
          .filter((index) => index !== -1);

        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        const newSquares = squares.slice();
        newSquares[randomIndex] = 'O'; // Bot always plays as 'O'
        setSquares(newSquares);
        setIsXNext(true);
      }, 500); // Adjust time to make it seem like the bot is thinking
    }
  }, [isXNext, squares, gameMode, winner]);

  return (
    <div className="flex flex-col items-center">
      <div className="status text-2xl mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-1">
        {Array(9).fill(null).map((_, index) => renderSquare(index))}
      </div>
      <button className="restart-btn" onClick={handleRestart}>Restart</button>
    </div>
  );
};

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;
