import React from "react";
import styles from "./Movie.module.css";

const Movie = (props) => {
  return (
    <li className={styles.movie}>
      <h2>{props.name}</h2>
      <h3>{props.releasedate}</h3>
      <p>{props.description}</p>
    </li>
  );
};

export default Movie;
