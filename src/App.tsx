import React from 'react';
import Board from './components/Board.tsx';

const App: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Board />
    </div>
  );
};

export default App;