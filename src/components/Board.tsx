import React, { useState, useEffect } from 'react';
import Square from './Square.tsx';

interface BoardProps {
  gameMode: "human" | "bot";
  onChangeGameMode: () => void;
  onWin: (winner: "X" | "O") => void;
  botDifficulty: "easy" | "medium" | "hard" | null;
}

const clickSound = new Audio("/noise/clickPop.mp3");
const victorySound = new Audio("/noise/victory.mp3");
const defeatSound = new Audio("/noise/defeat.mp3");
const drawSound = new Audio("/noise/draw.mp3");

const Board: React.FC<BoardProps> = ({ gameMode, onChangeGameMode, onWin, botDifficulty }) => {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [lastWinner, setLastWinner] = useState<string | null>(null);

  // Handle the player's move
  const handleClick = (index: number) => {
    if (calculateWinner(squares) || squares[index] || (gameMode === "bot" && !isXNext)) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);

    clickSound.play();
  };

  // Handle the game restart
  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setLastWinner(null); // Reset winner for the next round
  };

  // Bot's move logic based on difficulty
  useEffect(() => {
    if (gameMode === "bot" && !isXNext && botDifficulty && !calculateWinner(squares) && squares.includes(null)) {
      setTimeout(() => botMove(), 500);
    }
  }, [isXNext, squares, botDifficulty, gameMode]);

  const botMove = () => {
    const botSymbol = "O";
    let move = botDifficulty === "easy" ? getRandomMove() : botDifficulty === "medium" ? getMediumMove(botSymbol) : getHardMove(botSymbol);

    if (move !== null) {
      const newSquares = [...squares];
      newSquares[move] = botSymbol;
      setSquares(newSquares);
      setIsXNext(true);
    }
  };

  // Get random move for bot
  const getRandomMove = () => {
    const availableMoves = squares.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null) as number[];
    return availableMoves.length > 0 ? availableMoves[Math.floor(Math.random() * availableMoves.length)] : null;
  };

  // Get medium move for bot (either random or winning move)
  const getMediumMove = (botSymbol: "X" | "O") => {
    return findWinningMove(botSymbol) ?? getRandomMove();
  };

  // Get hard move for bot using minimax algorithm
  const getHardMove = (botSymbol: "X" | "O") => {
    return minimax(squares, botSymbol).index;
  };

  // Check for a winning move for bot
  const findWinningMove = (symbol: "X" | "O") => {
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        const testBoard = [...squares];
        testBoard[i] = symbol;
        if (calculateWinner(testBoard) === symbol) {
          return i;
        }
      }
    }
    return null;
  };

  // Minimax algorithm for hard difficulty bot
  const minimax = (board: ("X" | "O" | null)[], currentPlayer: "X" | "O") => {
    const availableMoves = board.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null) as number[];
    const winner = calculateWinner(board);
    if (winner === "X") return { score: -10 };
    if (winner === "O") return { score: 10 };
    if (availableMoves.length === 0) return { score: 0 };

    const moves = availableMoves.map(move => {
      const newBoard = [...board];
      newBoard[move] = currentPlayer;
      const result = minimax(newBoard, currentPlayer === "X" ? "O" : "X");
      return { index: move, score: result.score };
    });

    return currentPlayer === "O"
      ? moves.reduce((best, move) => (move.score > best.score ? move : best))
      : moves.reduce((best, move) => (move.score < best.score ? move : best));
  };

  // Calculate winner of the game
  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Check for winner or draw
  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : squares.includes(null)
    ? `Next player: ${isXNext ? 'X' : 'O'}`
    : "It's a draw!";

  // Play sounds based on the game state
  useEffect(() => {
    if (winner && winner !== lastWinner) {
      onWin(winner); // Inform App that there is a winner
      setLastWinner(winner);
      winner === "O" ? defeatSound.play() : victorySound.play();
    } else if (status === "It's a draw!") {
      drawSound.play();
    }
  }, [squares, winner, lastWinner, status, onWin]);

  return (
    <div className="flex flex-col items-center">
      <div className="status text-2xl mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-1">
        {Array(9)
          .fill(null)
          .map((_, index) => (
            <Square key={index} value={squares[index]} onClick={() => handleClick(index)} />
          ))}
      </div>
      <div className="flex gap-4 mt-4">
        <button className="restart-btn" onClick={handleRestart}>Restart</button>
        <button className="changeMode-btn bg-red-500 hover:bg-red-600" onClick={onChangeGameMode}>
          Change Game Mode
        </button>
      </div>
    </div>
  );
};

export default Board;
