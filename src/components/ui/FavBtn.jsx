import React from 'react';
import { useFavorites } from '../../context/FavoritesContext.jsx';

const FavBtn = ({ movie }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleClick = () => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
      style={{
        color: isFavorite(movie.id) ? '#FF1744' : '#FF4081',
        background: 'none',
        fontSize: '1.4em',
      }}>
      {isFavorite(movie.id) ? '♥' : '♡'}
    </button>
  );
};

export default FavBtn;