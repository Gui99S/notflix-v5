import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const { darkMode } = useTheme();

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="pagination" style={{
        background: darkMode ? '#18181b' : '#f9fafb',
        color: darkMode ? '#f9fafb' : '#18181b',
    }}>
      <button onClick={handlePrev} disabled={currentPage === 1} className="page-prev" style={{
          background: darkMode ? '#27272a' : '#fff',
          color: darkMode ? '#f9fafb' : '#18181b',
          border: `1px solid ${darkMode ? '#3f3f46' : '#999'}`,
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage === 1 ? 0.5 : 1,
          transition: 'background 0.2s, color 0.2s',
        }}>
        &#60; Prev
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages} className="page-next" style={{
          background: darkMode ? '#27272a' : '#fff',
          color: darkMode ? '#f9fafb' : '#18181b',
          border: `1px solid ${darkMode ? '#3f3f46' : '#999'}`,
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage === totalPages ? 0.5 : 1,
          transition: 'background 0.2s, color 0.2s',
        }}>
        Next &#62;
      </button>
    </div>
  );
};

export default Pagination;