import React from 'react'
import starIcon from '../../assets/star.png';
import noMovie from '../../assets/no-movie.png';
import { useTheme } from '../../context/ThemeContext'
import FavBtn from './FavBtn.jsx';
import { useFavorites } from '../../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, genresList }) => {
  const { title, vote_average, poster_path, release_date, original_language, genre_ids, id } = movie;
  const getGenreNames = (genreIds) => {
    if (!genreIds || !genresList) return "N/A"; // Handle missing data
    return genreIds
    .map((id) => {
      const genre = genresList.find((genre) => genre.id === id);
      return genre ? genre.name : "";
    })
    .join(", ");
  };
  const { darkMode } = useTheme();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className='movie-card' style={{
        backgroundColor: darkMode ? '#27272a' : '#fff',
        color: darkMode ? '#f9fafb' : '#1e293b',
        border: `1px solid ${darkMode ? '#3f3f46' : '#e5e7eb'}`,
        boxShadow: darkMode
        ? '0 2px 8px rgba(30, 41, 59, 0.25)'
        : '0 2px 8px rgba(30, 41, 59, 0.08)',
        
      }}>
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : noMovie } alt={title} />

        <div className="mt-4" style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
            minHeight: 0,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.5em',
            borderBottom: `1.5px solid ${darkMode ? '#fff' : '#1e293b'}`,
            paddingBottom: '0.5em',
            width: '100%',
          }}>
            <h3 style={{ color: darkMode ? '#fff' : '#1e293b',
            }}>{title}
            </h3>
          </div>
          <div className="content">
            <p className="genres">{getGenreNames(genre_ids)}</p>
            <br/>
            <div className="movie-info">
                <div className="rating">
                <img src={starIcon} alt="⭐" />
                <span>{vote_average ? vote_average.toFixed(1) : 'N/A'}</span>
              </div>
              <span>•</span>
              <p className="lang">{original_language}</p>
              <span>•</span>
              <p className="year">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
            </div>
            
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
        }}>
          <Link to={`/movie/${movie.id}`} className='showMore' style={{ 
          color: darkMode ? '#f9fafb' : '#18181b', 
          }} aria-label={`Show more about ${movie.title}`}>
          Show More&nbsp;<span style={{
            fontWeight: 'bold',
            fontSize: '1.6em',
          }}>»</span>
          </Link>
          <FavBtn className="favBtn" movie={movie} />
        </div>
      </div>
    </div>
  )
}

export default MovieCard
