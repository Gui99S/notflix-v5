import { useEffect, useState } from 'react';
import { useTheme } from "../context/ThemeContext.jsx";

const ModeToggle = () => {
  const { darkMode, setDarkMode } = useTheme()

  return (
    <button className="mode-toggle" aria-label="Toggle dark mode"
      onClick={() => setDarkMode((prev) => !prev)}
      style={{
        background: darkMode ? '#27272a' : '#fff',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        top: '0',
        gap: '0.5em',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        padding: '0.5em',
      }}>
      <span style={{
        fontSize: '1.5rem',
        color: '#fbbf24',
        opacity: darkMode ? 0.4 : 1,
        transition: 'opacity 0.2s',
      }}>
        ☀️
      </span>
      <span style={{
      height: '2rem',
      borderLeft: `3px solid ${darkMode ? '#3f3f46' : '#e5e7eb'}`,
      margin: '0 0.5em',
      display: 'inline-block',
      }} />
      <span style={{
        fontSize: '1.5rem',
        color: '#f9fafb',
        opacity: darkMode ? 1 : 0.4,
        transition: 'opacity 0.2s',
      }}>
        🌙
      </span>
    </button>
  );
};

export default ModeToggle;