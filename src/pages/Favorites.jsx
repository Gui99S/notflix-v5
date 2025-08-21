import React, { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/ui/MovieCard.jsx';
import RandomizeFav from '../utilities/Favorites/RandomizeFav.jsx';
import SortFavByGenre from '../utilities/Favorites/SortFavByGenre.jsx';

const Favorites = ({ genres = [] }) => {
  const { favorites, removeFavorite } = useFavorites();
  const [selectedGenre, setSelectedGenre] = useState("");
  const [displayedFavorites, setDisplayedFavorites] = useState(favorites);

  // Randomize handler
  const randomizeFavorites = () => {
    setSelectedGenre("");
    const shuffled = [...favorites].sort(() => 0.5 - Math.random());
    setDisplayedFavorites(shuffled);
  };

  const handleSort = (genreId) => {
    setSelectedGenre(genreId);
    if (genreId === '') {
      setDisplayedFavorites(favorites);
    } else {
      setDisplayedFavorites(
        favorites.filter(movie => movie.genre_ids.includes(Number(genreId)))
      );
    }
  };

  // Update displayedFavorites when favorites change
  React.useEffect(() => {
  if (selectedGenre) {
    const filtered = favorites.filter(movie =>
      movie.genre_ids && movie.genre_ids.includes(Number(selectedGenre))
    );
    setDisplayedFavorites(filtered);
  } else {
    setDisplayedFavorites(favorites);
  }
}, [favorites, selectedGenre]);

  return (
    <section className="all-movies">
      <div className="menu-container">
        <h2 className='mt-[40px]'>Favorited Movies</h2>
        <RandomizeFav onRandomize={randomizeFavorites} />
        <span />
        <SortFavByGenre
          genres={genres}
          onSort={handleSort}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
        />
    </div>
      {displayedFavorites.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>
            {window.location.pathname === '/favorites' && !selectedGenre
            ? 'You have no favorite movies yet.'
            : 'You have no favorite movies of this genre yet.'}
          </p>
        ) : (
          <ul className="favorites-list" style={{
            padding: '0 1em 0 0'
          }}>
          {displayedFavorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genresList={genres} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Favorites;