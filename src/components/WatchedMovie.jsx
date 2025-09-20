const WatchedMovie = ({ movie, onDeleteMovie }) => {
  return (
    <div className="flex">
      <li key={movie.id}>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runTime} min</span>
          </p>
        </div>
      </li>
      <button className="btn-delete" onClick={() => onDeleteMovie(movie.id)}>
        X
      </button>
    </div>
  );
};

export default WatchedMovie;
