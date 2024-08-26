import React from 'react';
import './MovieBar.css';

const MovieBar = ({ movieName, theatreName }) => (
  <div className="movie-bar-container">
    <div className="movie-info">
      <h1 className="movie-name">{movieName}</h1>
      <h2 className="theatre-name">{theatreName}</h2>
    </div>
  </div>
);

export default MovieBar;
