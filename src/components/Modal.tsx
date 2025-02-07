/**
 * @Author: Buntschu Leonard
 * @Date:   04-02-2025 14:26:39
 * @Last Modified by:   Buntschu Leonard
 * @Last Modified time: 07-02-2025 11:19:55
 * All rights reserved
 */

import React from 'react';

interface ModalProps {
  onGameModeSelect: (mode: 'human' | 'bot') => void;
}

const Modal: React.FC<ModalProps> = ({ onGameModeSelect }) => {
  return (
<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
  <div className="modal-content">
    <h2 className="modal-header">Choose Game Mode</h2>
    <div className="button-container">
      <button onClick={() => onGameModeSelect('human')} className="p-2 bg-blue-500 text-white rounded mb-2 w-full">
        Play Against Human
      </button>
      <button onClick={() => onGameModeSelect('bot')} className="p-2 bg-blue-500 text-white rounded w-full">
        Play Against Bot
      </button>
    </div>
  </div>
</div>
  );
};

export default Modal;