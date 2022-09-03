import MoviesList from "./Components/MoviesList";
import "./App.css";
import { useEffect, useState, useCallback } from "react";
import AddMovie from "./Components/AddMovie";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://react-http-95b9d-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error(response.status.toString());
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        if (data[key].title != "") {
          loadedMovies.push({
            id: key,
            title: data[key].title,
            openingText: data[key].openingText,
            releaseDate: data[key].releaseDate,
          });
        }
      }

      setMovies(loadedMovies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [movies]);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  const addMovieHandler = async (movie) => {
    try {
      const response = await fetch(
        "https://react-http-95b9d-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
        }
      );

      const data = response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  let content = <p>No Movies found</p>;

  if (isLoading) {
    content = <h3>loading...</h3>;
  }

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error} Something Went Wrong</p>;
  }

  return (
    <>
      <section>
        <AddMovie onAddMovie={addMovieHandler}></AddMovie>
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No movies found</p>}
        {isLoading && error == null && <h3>loading...</h3>}
        {error &&  <p>{error} Something Went Wrong</p>} */}
        {content}
      </section>
    </>
  );
};

export default App;
