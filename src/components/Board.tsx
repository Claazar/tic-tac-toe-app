/**
 * @Author: Buntschu Leonard
 * @Date:   04-02-2025 14:26:39
 * @Last Modified by:   Buntschu Leonard
 * @Last Modified time: 07-02-2025 11:48:02
 * All rights reserved
 */

import React, { useState, useEffect } from 'react';
import Square from './Square.tsx';

// Define types for the props that Board component will receive
interface BoardProps {
  gameMode: "human" | "bot";
  onChangeGameMode: () => void;
  onWin: (winner: "X" | "O") => void;
  botDifficulty: "easy" | "medium" | "hard" | null;
}

// Sound effects for different events in the game
/*
const clickSound = new Audio("/noise/clickPop.mp3");
const victorySound = new Audio("/noise/victory.mp3");
const defeatSound = new Audio("/noise/defeat.mp3");
const drawSound = new Audio("/noise/draw.mp3");
*/

// Board component handles the game logic and rendering of the board
const Board: React.FC<BoardProps> = ({ gameMode, onChangeGameMode, onWin, botDifficulty }) => {
  // State to track squares on the board
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  // State to track whose turn it is
  const [isXNext, setIsXNext] = useState(true);
  // State to track the last winner for sound effects
  const [lastWinner, setLastWinner] = useState<string | null>(null);

  // Handle players click on square
  const handleClick = (index: number) => {
    // If there is already a winner, the square is occupied or its the bots turn: do nothing
    if (calculateWinner(squares) || squares[index] || (gameMode === "bot" && !isXNext)) {
      return;
    }
    // Update the board statue with the new move
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext); // Switch turns between X and O

    // Play click sound effect
    // clickSound.play();
  };

  // Handle game restart
  const handleRestart = () => {
    setSquares(Array(9).fill(null)); // Reset board
    setIsXNext(true); // Set X to start first
    setLastWinner(null); // Reset winner for the next round
  };

    // Bot move logic based on difficulty
    useEffect(() => {
      if (gameMode === "bot" && !isXNext && botDifficulty && !calculateWinner(squares) && squares.includes(null)) {
        setTimeout(() => botMove(), 500); // Added delay to simulate thinking
      }
    }, [isXNext, squares, botDifficulty, gameMode]);


  // Bot makes a move based on difficulty
  const botMove = () => {
    const botSymbol = "O";
    let move = botDifficulty === "easy" ? getRandomMove() : botDifficulty === "medium" ? getMediumMove(botSymbol) : getHardMove(botSymbol);

    if (move !== null) {
      const newSquares = [...squares];
      newSquares[move] = botSymbol; // Update board with bot move
      setSquares(newSquares);
      setIsXNext(true); // Switch turn to X after bot move
    }
  };


  // Get random move for bot (easy difficulty)
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
    return minimax(squares, botSymbol).index; // Get the best move based on minimax
  };

  // Check for a winning move for bot
  const findWinningMove = (symbol: "X" | "O") => {
    for (let i = 0; i < 9; i++) {
      if (!squares[i]) {
        const testBoard = [...squares];
        testBoard[i] = symbol;
        if (calculateWinner(testBoard) === symbol) {
          return i; // Found and return winning move
        }
      }
    }
    return null; // No winning move found
  };

  // Minimax algorithm for hard difficulty bot (chooses the best move)
  const minimax = (board: ("X" | "O" | null)[], currentPlayer: "X" | "O") => {
    const availableMoves = board.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null) as number[];
    const winner = calculateWinner(board);
    if (winner === "X") return { score: -10 }; // X wins
    if (winner === "O") return { score: 10 }; // O wins
    if (availableMoves.length === 0) return { score: 0 }; // Draw game

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
        return squares[a]; // Return winner
      }
    }
    return null; // No winner
  };

  // Check for winner or draw
  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}` // If there is a winner, show
    : squares.includes(null)
    ? `Next player: ${isXNext ? 'X' : 'O'}` // If no winner, show next turn
    : "It's a draw!"; // If it is draw game

  // Play sounds based on the game state
  
  useEffect(() => {
    if (winner && winner !== lastWinner) {
      onWin(winner); // Inform App that there is a winner
      setLastWinner(winner); // Update last winner to prevent replaying victory sound
      // winner === "O" ? defeatSound.play() : victorySound.play(); // Play apporpriate sound
    } else if (status === "It's a draw!") {
      // drawSound.play(); // Play draw sound
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
