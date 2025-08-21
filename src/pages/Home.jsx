import React from 'react';
import Search from '../utilities/Search.jsx';
import Spinner from '../components/ui/Spinner.jsx';

const Home = ({
  searchTerm,
  setSearchTerm,
  darkMode,
  isLoading,
  errorMessage,
  setLoading,
  setErrorMessage,
}) => (
  <>
    <header>
      <h1>
        Find <span className="text-gradient">Movies</span> You'll Enjoy
      </h1>
      <div className="search-container">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} setLoading={setLoading} setError={setErrorMessage} />
      </div>
    </header>
    
  </>
);

export default Home;