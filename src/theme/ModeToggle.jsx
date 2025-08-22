import { useEffect, useState } from 'react';
import { useTheme } from "../context/ThemeContext.jsx";
import useIsMobile from '../hooks/useIsMobile.jsx';

const ModeToggle = () => {
  const { darkMode, setDarkMode } = useTheme()
  const isMobile = useIsMobile();

  return (
    <button className="mode-toggle" aria-label="Toggle dark mode"
      onClick={() => setDarkMode((prev) => !prev)} style={{
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
      {isMobile ? (
        <span style={{
            fontSize: '1.5rem',
            color: darkMode ? '#f9fafb' : '#fbbf24',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            overflow: 'hidden',
            opacity: 1,
            transition: 'opacity 0.2s',
          }}>
          {darkMode ? '🌙' : '☀️'}
        </span>
      ) : (
        <>
          <span className="icon-sun" style={{
              fontSize: '1.5rem',
              color: '#fbbf24',
              opacity: darkMode ? 0.4 : 1,
              transition: 'opacity 0.2s',
            }}>☀️</span>
          <span className="icon-divider" style={{
              height: '2rem',
              borderLeft: `3px solid ${darkMode ? '#3f3f46' : '#e5e7eb'}`,
              margin: '0 0.5em',
              display: 'inline-block',
            }} />
          <span className="icon-moon" style={{
              fontSize: '1.5rem',
              color: '#f9fafb',
              opacity: darkMode ? 1 : 0.4,
              transition: 'opacity 0.2s',
            }}>🌙</span>
        </>
      )}
    </button>
  )
}

export default ModeToggle;