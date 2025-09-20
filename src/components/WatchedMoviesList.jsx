import WatchedMovie from "./WatchedMovie";

const WatchedMoviesList = ({ watched, onDeleteMovie }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.id}
          movie={movie}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </ul>
  );
};
export default WatchedMoviesList;
