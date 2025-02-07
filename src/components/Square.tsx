/**
 * @Author: Buntschu Leonard
 * @Date:   04-02-2025 14:26:39
 * @Last Modified by:   Buntschu Leonard
 * @Last Modified time: 07-02-2025 11:20:05
 * All rights reserved
 */

import React from 'react';

interface SquareProps {
    value: string | null;
    onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
    return (
        <button
        className="w-20 h-20 bg-white border-2 border-gray-400 text-2xl font-bold flex items-center justify-center"
        onClick={onClick}
        >
            {value}
        </button>
    )

}

export default Square;