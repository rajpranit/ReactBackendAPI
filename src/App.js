import MoviesList from "./Components/MoviesList";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMovieHandler() {
    setIsLoading(true);
    const response = await fetch("https://swapi.py4e.com/api/films/");

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
  }

  return (
    <>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading ? <MoviesList movies={movies} /> : <h3>loading...</h3>}
        {!isLoading && movies.length === 0 && <p>No movies found</p>}
      </section>
    </>
  );
};

export default App;
