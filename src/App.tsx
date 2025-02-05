import React, { useState } from 'react';
import Board from './components/Board.tsx';

const App: React.FC = () => {
  const [gameMode, setGameMode] = useState<"human" | "bot" | null>(null); // 'null' means not selected yet

  const handleGameModeSelect = (mode: "human" | "bot") => {
    setGameMode(mode);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 relative">
      {gameMode === null && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-xl mb-4">Choose a Game Mode</h2>
            <button
              className="modal-button"
              onClick={() => handleGameModeSelect("human")}
            >
              Play against another human
            </button>
            <button
              className="modal-button"
              onClick={() => handleGameModeSelect("bot")}
            >
              Play against the bot
            </button>
          </div>
        </div>
      )}

      {/* Game Board */}
      {gameMode !== null && <Board gameMode={gameMode} />}
    </div>
  );
};

export default App;
