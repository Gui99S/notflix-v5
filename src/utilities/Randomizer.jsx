import React from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

const Randomizer = ({ randomizeMovies }) => {
  const { darkMode } = useTheme();

  return (
    <div>
      <button onClick={randomizeMovies} className="dice-button" style={{
          backgroundColor: darkMode ? '#18181b' : '#e5e7eb',
          color: darkMode ? '#f9fafb' : '#18181b',
          border: `1px solid ${darkMode ? '#3f3f46' : '#999'}`,
          transition: 'all 0.2s',
        }}>
        🎲
      </button>
    </div>
  )
}

export default Randomizer