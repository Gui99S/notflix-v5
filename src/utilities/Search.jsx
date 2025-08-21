import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useNavigate } from 'react-router-dom';

function Search({ setSearchTerm, setLoading, setError }) {
  const [query, setQuery] = useState('');
  const { darkMode } = useTheme();
  const navigate = useNavigate();

   const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    setSearchTerm(query);
    navigate('/catalogue');
  };
  
  return (
    <form onSubmit={handleSearch}>
      <div className="searchInputWrap">
        <input type="text" style={{
            backgroundColor: darkMode ? '#18181b' : '#fff',
            color: darkMode ? '#f9fafb' : '#1e293b',
            border: `1px solid ${darkMode ? '#3f3f46' : '#e5e7eb'}`,
          }}
          placeholder="Buscar filmes..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className='searchBtn' type="submit" style={{
            backgroundColor: darkMode ? '#27272a' : '#e5e7eb',
            color: darkMode ? '#f9fafb' : '#1e293b',
            border: `1px solid ${darkMode ? '#3f3f46' : '#e5e7eb'}`,
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Buscar
        </button>
      </div>
    </form>
  )
}

export default Search