import { useRef, useState } from "react";
import { useEffect } from "react";
import Loading from "./Loading";
import StarRating from "./StarRating";
import { useKey } from "../hooks/useKey";

const apiKey = import.meta.env.VITE_API_KEY;

const SelectedMovie = ({
  movieID,
  setSelectedMovieID,
  setWatchedMovies,
  watched,
}) => {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [userRating, setUserRating] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const noOfRatingsCount = useRef(0);

  useKey("Escape", () => {
    setSelectedMovieID(null);
  });

  // const oldUserRating = useState(() => {
  //   return watched.find((movie) => movie.id === selectedMovie.imdb)?.userRating;
  // });

  const isWatched = watched.find((movie) => movie.id === selectedMovie.imdbID);
  const oldUserRating = watched.find(
    (movie) => movie.id === selectedMovie.imdbID
  )?.userRating;

  const handleAddToList = () => {
    setWatchedMovies((prev) => [
      ...prev,
      {
        id: selectedMovie.imdbID,
        title: selectedMovie.Title,
        poster: selectedMovie.Poster,
        imdbRating: +selectedMovie.imdbRating,
        userRating,
        runTime: Number(selectedMovie.Runtime.split(" ").slice(0, 1)),
        noOfRatingsCount: noOfRatingsCount.current,
      },
    ]);
    setSelectedMovieID(null);
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const data = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&i=${movieID}`
      );
      const res = await data.json();
      setSelectedMovie(res);
      setIsLoading(false);
    };
    getMovieDetails();
  }, [movieID]);

  // useEffect(() => {
  //   const callBackFn = (e) => {
  //     e.code === "Escape" && setSelectedMovieID(null);
  //   };
  //   document.addEventListener("keydown", callBackFn);
  //   return () => {
  //     document.removeEventListener("keydown", callBackFn);
  //   };
  // }, [setSelectedMovieID]);

  useEffect(() => {
    if (!selectedMovie?.Title) return;
    document.title = `Movie | ${selectedMovie.Title}`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [selectedMovie.Title]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    if (userRating) noOfRatingsCount.current++;
  }, [userRating]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="details">
        <button
          className="btn-back"
          onClick={() => {
            setSelectedMovieID(null);
          }}
        >
          &#8592;
        </button>
        <header>
          <img src={selectedMovie.Poster} alt="" />
          <section className="summary">
            <h1>{selectedMovie.Title}</h1>
            <div>
              <span>{selectedMovie.Released}</span>
              <span> - </span>
              <span>{selectedMovie.Runtime}</span>
            </div>
            <span>{selectedMovie.Genre}</span>
            <span>⭐️ {selectedMovie.imdbRating} IMDb rating</span>
          </section>
        </header>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRating maxRating={10} setUserRating={setUserRating} />
              {userRating && (
                <button className="btn-add" onClick={handleAddToList}>
                  + Add to list
                </button>
              )}
            </>
          ) : (
            <h2>You rated this movie {oldUserRating} ⭐</h2>
          )}
          <em>{selectedMovie.Plot}</em>
          <span>Starring {selectedMovie.Actors}</span>
          <span>Directed By {selectedMovie.Director}</span>
        </div>
      </div>
    </>
  );
};
export default SelectedMovie;
