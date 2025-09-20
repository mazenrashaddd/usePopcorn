import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

export const useMovies = (searchQuery, setSelectedMovieID) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const searchMovies = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setMovies(data?.Search);
        setSelectedMovieID(null);
        setIsLoading(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch Error", error);
        }
      }
    };
    searchMovies();
    return () => {
      controller.abort();
    };
  }, [searchQuery, setSelectedMovieID]);
  return { movies, isLoading };
};
