import Movie from "./Movie";

const MovieList = ({ movies, onMovieClick }) => {
  return (
    <ul className="list">
      {(movies || [])?.map((movie, idx) => (
        <Movie key={idx} movie={movie} onMovieClick={onMovieClick} />
      ))}
    </ul>
  );
};

export default MovieList;
