import React, { useState, useEffect } from "react";
import Board from "./components/Board.tsx";

const App: React.FC = () => {
  const [gameMode, setGameMode] = useState<"human" | "bot" | null>(null);
  const [botDifficulty, setBotDifficulty] = useState<"easy" | "medium" | "hard" | null>(null);
  const [wins, setWins] = useState({ X: 0, O: 0 });

  const handleGameModeSelect = (mode: "human" | "bot") => {
    if (mode === "bot") {
      setBotDifficulty(null);
    }
    setGameMode(mode);
  };

  const handleDifficultySelect = (difficulty: "easy" | "medium" | "hard") => {
    setBotDifficulty(difficulty);
  };

  const handleChangeGameMode = () => {
    setGameMode(null);
    setBotDifficulty(null);
  };

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
