import React, { useEffect } from 'react';
import MovieCard from '../components/ui/MovieCard.jsx';
import Randomizer from '../utilities/Randomizer.jsx';
import Filter from '../utilities/Filter.jsx';
import Pagination from '../components/ui/Pagination.jsx';
import Spinner from '../components/ui/Spinner.jsx';
import { Link } from 'react-router-dom';

const Catalogue = ({
  movies = [],
  genres = [],
  isLoading,
  errorMessage,
  selectedGenre,
  setSelectedGenre,
  randomizeMovies,
  currentPage,
  setCurrentPage,
  totalPages,
  darkMode,
  searchTerm,
  setSearchTerm,
}) => {
  // Clear filter when leaving the page
  useEffect(() => {
    return () => {
      setSelectedGenre('');
    };
  }, [setSelectedGenre]);

  return (
  <section className="all-movies">
    <div className={`menu-container${searchTerm ? ' show-cancel' : ''}`} id="menu-container-catalogue">
      <h2 className='mt-[40px]'>Catalogue</h2>
      <Randomizer randomizeMovies={randomizeMovies} />
      {searchTerm ? (
          <button className='clearSearchBtn' onClick={() => setSearchTerm('')} style={{
              background: darkMode ? '#18181b' : '#fff',
              color: darkMode ? '#f9fafb' : '#18181b',
              border: `1px solid ${darkMode ? '#3f3f46' : '#e5e7eb'}`,
            }} aria-label="Clear search and show catalogue">
          {/* Clear icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6"/>
          </svg>
          Clear Search
        </button>
      ) : (
        <span />
      )}
      <Filter className="filter-select" 
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        genres={genres}
        />
    </div>
    {isLoading ? (
      <div style={{ color: darkMode ? '#f9fafb' : '#18181b' }}>
        <Spinner />
      </div>
    ) : errorMessage ? (
      <div className='errorMessage'>{errorMessage}</div>
    ) : (
      <ul style={{
        padding: '0 1em 0 0',
      }}>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} genresList={genres} />
        ))}
      </ul>
    )}
      {/* Error Message: 'No movies found' if not loading, no error, and movies is empty after a search */}
      {!isLoading && !errorMessage && movies.length === 0 && searchTerm && (
        <div className="errorMessage" style={{
          textAlign: 'center',
          color: '#ef4444',
        }}>
          No movies found. <Link to="/" style={{ fontWeight: 'bold' }}>Try again?</Link>
        </div>
      )}
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
    />
  </section>
  );
};

export default Catalogue;