import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import Navbar from './components/Layout/Navbar.jsx';
import Catalogue from './pages/Catalogue.jsx';
import Favorites from './pages/Favorites.jsx';
import { useTheme } from './context/ThemeContext.jsx';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRandomized, setIsRandomized] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { darkMode } = useTheme();

  // Fetch genres once
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/genre/movie/list`,
          API_OPTIONS
        );
        if (!response.ok) {
          throw new Error("Failed to fetch genres");
        }
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Unified fetch logic for search, genre, and pagination
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setErrorMessage('');
      setIsRandomized(false);

      try {
        let endpoint;
        if (selectedGenre) {
          endpoint = `${API_BASE_URL}/discover/movie?with_genres=${selectedGenre}&sort_by=popularity.desc&page=${currentPage}`;
        } else if (debouncedSearchTerm) {
          endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(debouncedSearchTerm)}&page=${currentPage}`;
        } else {
          endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${currentPage}`;
        }

        const response = await fetch(endpoint, API_OPTIONS);
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setFilteredMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        setErrorMessage('Error fetching movies. Please try again later');
        setFilteredMovies([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [selectedGenre, debouncedSearchTerm, currentPage]);

// Randomize logic (randomizes all movies or all movies of selected genre)
const randomizeMovies = async () => {
  setIsLoading(true);
  setIsRandomized(true);

  let allResults = [];
  let endpoint;
  if (selectedGenre) {
    endpoint = `${API_BASE_URL}/discover/movie?with_genres=${selectedGenre}&sort_by=popularity.desc&page=`;
  } else if (debouncedSearchTerm) {
    endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(debouncedSearchTerm)}&page=`;
  } else {
    endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=`;
  }

  try {
    // Fetch first page to get totalPages
    const response = await fetch(endpoint + '1', API_OPTIONS);
    if (!response.ok) throw new Error('Failed to fetch movies');
    const data = await response.json();
    allResults = data.results || [];
    const pages = Math.min(data.total_pages, 5); // You can keep this, but will only use 20

    // Fetch remaining pages (optional, but will only use 20)
    for (let page = 2; page <= pages; page++) {
      const res = await fetch(endpoint + page, API_OPTIONS);
      if (res.ok) {
        const d = await res.json();
        allResults = allResults.concat(d.results || []);
      }
    }

    // Shuffle all results
    const shuffled = [...allResults].sort(() => 0.5 - Math.random()).slice(0,20);
    setFilteredMovies(shuffled);
    setTotalPages(1); // Show all results on one page
    setCurrentPage(1);
  } catch (error) {
    setErrorMessage('Error randomizing movies.');
    setFilteredMovies([]);
    setTotalPages(1);
  } finally {
    setIsLoading(false);
  }
};

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGenre, debouncedSearchTerm]);

  return (
    <Router>
      <main style={{
        backgroundColor: darkMode ? '#18181b' : '#f9fafb',
        color: darkMode ? '#f9fafb' : '#18181b',
        paddingTop: '72px',
        minHeight: '100vh',
        maxHeight: 'auto',
      }}>
        <div className="flex items-stretch">
          <Navbar 
            setSearchTerm={setSearchTerm}
            setError={setErrorMessage}
            setLoading={setIsLoading}
            setMovies={setFilteredMovies}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  setLoading={setIsLoading}
                  setError={setErrorMessage}
                  darkMode={darkMode}
                  isLoading={isLoading}
                  errorMessage={errorMessage}
                  filteredMovies={filteredMovies}
                  genres={genres}
                  selectedGenre={selectedGenre}
                  setSelectedGenre={setSelectedGenre}
                  setFilteredMovies={setFilteredMovies}
                  randomizeMovies={randomizeMovies}
                  currentPage={currentPage}
                  moviesPerPage={20}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              }
            />
            <Route
              path="/catalogue"
              element={
                <Catalogue
                  movies={filteredMovies}
                  genres={genres}
                  isLoading={isLoading}
                  errorMessage={errorMessage}
                  selectedGenre={selectedGenre}
                  setSelectedGenre={setSelectedGenre}
                  randomizeMovies={randomizeMovies}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                  darkMode={darkMode}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              }
            />
            <Route path="/favorites" element={<Favorites genres={genres} />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </main>
    </Router>
  )
}

export default App