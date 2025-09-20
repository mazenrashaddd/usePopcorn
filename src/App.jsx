import { useState } from "react";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import NumOfResults from "./components/NumOfResults";
import SearchField from "./components/SearchField";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Box from "./components/Box";
import SelectedMovie from "./components/SelectedMovie";
import Loading from "./components/Loading";
import { useMovies } from "./hooks/useMovies";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const [watched, setWatchedMovies] = useState(() => {
    const res = JSON.parse(localStorage.getItem("watched"));
    return res ? res : [];
  });
  const [selectedMovieID, setSelectedMovieID] = useState(null);

  const { movies, isLoading } = useMovies(searchQuery, setSelectedMovieID);

  // const tempMovieData = [

  const onMovieClick = (id) => {
    setSelectedMovieID((prevID) => (id === prevID ? null : id));
  };

  const onDeleteMovie = (movieID) => {
    setWatchedMovies((watched) =>
      watched.filter((movie) => movie.id !== movieID)
    );
  };
  //   {
  //     imdbID: "tt1375666",
  //     Title: "Inception",
  //     Year: "2010",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  //   },
  //   {
  //     imdbID: "tt0133093",
  //     Title: "The Matrix",
  //     Year: "1999",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  //   },
  //   {
  //     imdbID: "tt6751668",
  //     Title: "Parasite",
  //     Year: "2019",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  //   },
  // ];

  // const tempWatchedData = [
  //   {
  //     imdbID: "tt1375666",
  //     Title: "Inception",
  //     Year: "2010",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  //     runtime: 148,
  //     imdbRating: 8.8,
  //     userRating: 10,
  //   },
  //   {
  //     imdbID: "tt0088763",
  //     Title: "Back to the Future",
  //     Year: "1985",
  //     Poster:
  //       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  //     runtime: 116,
  //     imdbRating: 8.5,
  //     userRating: 9,
  //   },
  // ];

  return (
    <>
      <Navbar>
        <SearchField
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <NumOfResults movies={movies} isLoading={isLoading} />
      </Navbar>
      <Main>
        <Box>
          {isLoading ? (
            <Loading />
          ) : (
            <MovieList movies={movies} onMovieClick={onMovieClick} />
          )}
        </Box>
        <Box>
          {!selectedMovieID ? (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteMovie={onDeleteMovie}
              />
            </>
          ) : (
            <SelectedMovie
              movieID={selectedMovieID}
              setSelectedMovieID={setSelectedMovieID}
              setWatchedMovies={setWatchedMovies}
              watched={watched}
            />
          )}
        </Box>
        {/* <StarRating maxRating={10} />
        <StarRating
          maxRating={5}
          messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
        /> */}
      </Main>
    </>
  );
}

export default App;
