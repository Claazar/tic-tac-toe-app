import React from 'react';

interface ModalProps {
  onGameModeSelect: (mode: 'human' | 'bot') => void;
}

const Modal: React.FC<ModalProps> = ({ onGameModeSelect }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-md">
        <h2 className="text-xl mb-4">Choose Game Mode</h2>
        <button onClick={() => onGameModeSelect('human')} className="p-2 bg-blue-500 text-white rounded mb-2 w-full">
          Play Against Human
        </button>
        <button onClick={() => onGameModeSelect('bot')} className="p-2 bg-blue-500 text-white rounded w-full">
          Play Against Bot
        </button>
      </div>
    </div>
  );
};

export default Modal;
