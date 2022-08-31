import React from "react";
import styles from "./MoviesLIst.module.css";
import Movie from "./Movie";

const MoviesList = (props) => {
  return (
    <ul className={styles["movies-list"]}>
      {props.movies.map((movie) => (
        <Movie
          name={movie.title}
          description={movie.openingText}
          releasedate={movie.releaseDate}
        ></Movie>
      ))}
    </ul>
  );
};

export default MoviesList;
