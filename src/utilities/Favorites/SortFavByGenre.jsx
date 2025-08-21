import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const SortFavByGenre = ({ genres, onSort }) => {
  const { darkMode } = useTheme();

  return (
    <div className="custom-select">
        <select onChange={e => onSort(e.target.value)} style={{
        backgroundColor: darkMode ? '#18181b' : '#fff',
        color: darkMode ? '#f9fafb' : '#18181b',
        border: `1px solid ${darkMode ? '#3f3f46' : 'rgba(249,250,251,0.10)'}`,
        boxShadow: darkMode ? 'none' : 'rgba(0, 0, 0, 0.1) 0px 2px 8px',
        }} aria-label="Sort favorites by genre" defaultValue="">
        <option value="" disabled>
          Sort by Genre
        </option>
        <option value="">Any Genre</option>
        {genres.map(genre => (
        <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
        </select>
    </div>
  );
};

export default SortFavByGenre;