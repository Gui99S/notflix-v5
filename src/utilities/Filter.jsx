import React from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

const Filter = ({ selectedGenre, setSelectedGenre, genres, allMovies, setFilteredMovies }) => {
  const { darkMode } = useTheme();

  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);

    if (!genreId) {
      setFilteredMovies(allMovies); 
    } else {
      const filtered = allMovies.filter(movie =>
        movie.genre_ids && movie.genre_ids.includes(Number(genreId))
      );
      setFilteredMovies(filtered);
    }
  };

  return (
    <div className="custom-select">
      <select value={selectedGenre} onChange={handleGenreChange} style={{
        backgroundColor: darkMode ? '#18181b' : '#fff',
        color: darkMode ? '#f9fafb' : '#18181b',
        border: `1px solid ${darkMode ? '#3f3f46' : 'rgba(249,250,251,0.10)'}`,
        boxShadow: darkMode ? 'none' : 'rgba(0, 0, 0, 0.1) 0px 2px 8px',
      }}>
      <option value="">Any Genre</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>{genre.name}</option>
      ))}
      </select>
    </div> 
  )
}

export default Filter