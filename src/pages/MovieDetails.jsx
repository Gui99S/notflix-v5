import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import noMovie from '../assets/no-movie.png';


const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetails = () => {
  const { id } = useParams();
  const { darkMode } = useTheme();
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE_URL}/movie/${id}?append_to_response=credits`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );
        const data = await res.json();
        setMovie(data);
        setGenres(data.genres || []);
      } catch (err) {
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '2em' }}>Loading...</div>;
  if (!movie) return <div style={{ textAlign: 'center', padding: '2em' }}>Movie not found.</div>;

  const {
    title,
    poster_path,
    backdrop_path,
    overview,
    genres: movieGenres,
    runtime,
    popularity,
    release_date,
    original_language,
    vote_average,
    credits,
  } = movie;

  // Get director and top 5 cast
  const director = credits?.crew?.find(person => person.job === 'Director');
  const cast = credits?.cast?.slice(0, 5) || [];

  return (
    <div style={{
      minHeight: '100%',
      background: darkMode ? '#18181b' : '#f9fafb',
      width: '100%',
    }}>
    <div className='movie-details-flex' style={{
        boxShadow: darkMode
          ? '0 4px 24px rgba(30,41,59,0.35)'
          : '0 4px 24px rgba(30,41,59,0.12)',
        background: darkMode ? '#18181b' : '#fff',
      }}>
      {/* Left Container */}
      <div className='leftContainerMD' style={{
        background: darkMode ? '#27272a' : '#f9fafb',
        }}>
        <img src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : noMovie
          } alt={title} />
      </div>
      {/* Right: Details */}
      <div className='rightContainerMD' style={{
          color: darkMode ? '#f9fafb' : '#1e293b',
          background: backdrop_path
          ? `url(https://image.tmdb.org/t/p/w1280/${backdrop_path}) center/cover no-repeat` : darkMode ? '#18181b' : '#fff',
          ...(backdrop_path && !darkMode && {
            // Light mode: blur and brighten
            backdropFilter: 'blur(8px) brightness(0.7)',
            WebkitBackdropFilter: 'blur(8px) brightness(0.7)',
            backgroundBlendMode: 'overlay',
            backgroundColor: 'rgba(255,255,255,0.85)',
          }),
          ...(backdrop_path && darkMode && {
            // Dark mode: blur and darken
            backdropFilter: 'blur(8px) brightness(0.4)',
            WebkitBackdropFilter: 'blur(8px) brightness(0.4)',
            backgroundBlendMode: 'overlay',
            backgroundColor: 'rgba(24,24,27,0.85)',
          }),
        }}>
        <button onClick={() => navigate(-1)} style={{
            position: 'absolute',
            top: '0.5em',
            right: '0.5em',
            background: 'transparent',
            color: darkMode ? '#fff' : '#18181b',
            width: '2.2em',
            height: '2.2em',
            fontSize: '1.1em',
            marginLeft: '2rem',
            border: '0.6px solid ' + (darkMode ? '#fff' : '#000'),
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
          }} aria-label="Close details">X</button>
        <h2 style={{
          color: darkMode ? '#fff' : '#18181b',
          textShadow: backdrop_path ? '0 2px 8px rgba(0,0,0,0.25)' : 'none',
        }}>{title}</h2>
        <div style={{
          fontSize: '1.1em',
          fontWeight: 400,
          textAlign: 'justify',
          marginBottom: '1.2em',
          color: darkMode ? '#f3f4f6' : '#334155',
        }}>
          {overview || 'No summary available.'}
        </div>
        <div style={{
          marginBottom: '1em',
          fontSize: '1em',
          fontWeight: 500,
        }}>
          <span><b>Genres:</b> {movieGenres?.map(g => g.name).join(', ') || 'N/A'}</span>
        </div>
        <div style={{
          display: 'flex',
          gap: '1.5em',
          flexWrap: 'wrap',
          marginBottom: '1em',
        }}> <span><b>Release:</b> {release_date ? release_date : 'N/A'}</span>
          <span><b>Runtime:</b> {runtime ? `${runtime} min` : 'N/A'}</span>
          <span><b>Popularity:</b> {popularity ? popularity.toFixed(1) : 'N/A'}</span>
          <span><b>Language:</b> {original_language?.toUpperCase() || 'N/A'}</span>
          <span><b>Rating:</b> {vote_average ? vote_average.toFixed(1) : 'N/A'}</span>
        </div>
        <div style={{
          marginBottom: '1em',
        }}>
          <span><b>Director:</b> {director ? director.name : 'N/A'}</span>
        </div>
        <div style={{
          marginBottom: '1em',
        }}>
          <span><b>Cast:</b> {cast.length > 0 ? cast.map(actor => actor.name).join(', ') : 'N/A'}</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MovieDetails;