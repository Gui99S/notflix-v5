import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const RandomizeFav = ({ onRandomize }) => {
  const { darkMode } = useTheme();

  return (
    <button onClick={onRandomize} className="dice-button" style={{
        backgroundColor: darkMode ? '#18181b' : '#e5e7eb',
        color: darkMode ? '#f9fafb' : '#18181b',
        border: `1px solid ${darkMode ? '#3f3f46' : '#999'}`,
        transition: 'all 0.2s',
    }} aria-label="Randomize favorite movies">
      🎲
    </button>
  );
};

export default RandomizeFav;