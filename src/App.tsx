/**
 * @Author: Buntschu Leonard
 * @Date:   04-02-2025 14:26:39
 * @Last Modified by:   Buntschu Leonard
 * @Last Modified time: 07-02-2025 09:19:07
 * All rights reserved
 */

import React, { useState, useEffect } from "react";
import Board from "./components/Board.tsx";

// Main App component
const App: React.FC = () => {
  // State for game mode (vs human or vs bot)
  const [gameMode, setGameMode] = useState<"human" | "bot" | null>(null);
  // State for bot difficulty (easy, medium, hard)
  const [botDifficulty, setBotDifficulty] = useState<"easy" | "medium" | "hard" | null>(null);
  // State to keep track of the wins of both players
  const [wins, setWins] = useState({ X: 0, O: 0 });

  // Function to handle game mode selection
  const handleGameModeSelect = (mode: "human" | "bot") => {
    if (mode === "bot") {
      setBotDifficulty(null); // Reset bot difficulty when switching to bot mode
    }
    setGameMode(mode); // Set selected gamemode
  };

  // Function to handle bot difficulty selection
  const handleDifficultySelect = (difficulty: "easy" | "medium" | "hard") => {
    setBotDifficulty(difficulty); // Set the selected difficulty
  };

  // Function to reset gamemode and bot difficulty
  const handleChangeGameMode = () => {
    setGameMode(null); // Reset game mode
    setBotDifficulty(null); // Reset bot difficulty
  };

  // Functuon to update the win count for a specific player
  const handleWin = (winner: "X" | "O") => {
    setWins((prevWins) => ({ ...prevWins, [winner]: prevWins[winner] + 1 }));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 relative">
      {gameMode === null ? (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-xl mb-4">Choose a Game Mode</h2>
            <button className="modal-button" onClick={() => handleGameModeSelect("human")}>
              Play Local vs Human
            </button>
            <button className="modal-button" onClick={() => handleGameModeSelect("bot")}>
              Play Online vs Bot
            </button>
          </div>
        </div>
      ) : gameMode === "bot" && botDifficulty === null ? (
        <div className="modal-overlay">
          <div className="modal-content-difficulty">
            <h2 className="text-xl mb-4">Choose Difficulty</h2>
            <button className="modal-button-difficulty" onClick={() => handleDifficultySelect("easy")}>Easy</button>
            <button className="modal-button-difficulty" onClick={() => handleDifficultySelect("medium")}>Medium</button>
            <button className="modal-button-difficulty" onClick={() => handleDifficultySelect("hard")}>Hard</button>
          </div>
        </div>
      ) : (
        <>
          <div className="text-xl mb-4">X Wins: {wins.X} | O Wins: {wins.O}</div>
          <Board gameMode={gameMode} botDifficulty={botDifficulty} onChangeGameMode={handleChangeGameMode} onWin={handleWin} />
        </>
      )}
    </div>
  );
};

export default App;
