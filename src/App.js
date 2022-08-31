import MoviesList from "./Components/MoviesList";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [movies, setMovies] = useState([]);

  async function fetchMovieHandler() {
    const response = await fetch("https://swapi.py4e.com/api/films/");

    const data = await response.json();

    const TransformedData = data.results.map((movie) => {
      return {
        id: movie.episode_id,
        title: movie.title,
        openingText: movie.opening_crawl,
        releaseDate: movie.release_date,
      };
    });
    setMovies(TransformedData);
  }

  return (
    <>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </>
  );
};

export default App;
