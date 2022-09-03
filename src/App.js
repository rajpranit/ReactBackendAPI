import MoviesList from "./Components/MoviesList";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMovieHandler() {
    try {
      setIsLoading(true);
      const response = await fetch("https://swapi.py4e.com/api/films/");

      if (!response.ok) {
        throw new Error(response.status.toString());
      }

      const data = await response.json();
      console.log("getting data");

      const TransformedData = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        };
      });
      setMovies(TransformedData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

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
