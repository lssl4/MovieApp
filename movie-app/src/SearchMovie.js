import React, { useState } from "react";

export default function SearchMovie() {
  const [query, setQuery] = useState("");

  const [movies, setMovies] = useState([]);

  const searchMovie = async (e) => {
    e.preventDefault();

    const URL = `https://api.themoviedb.org/3/search/movie?api_key=48a10cb59752397eb6f242b68bba380a&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(URL);
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="form" onSubmit={searchMovie}>
        <label htmlFor="query" className="label">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="ie Jurassic Park"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => {
            return (
              <div className="card" key={movie.id}>
                <img
                  className="card--image"
                  src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                  alt={movie.title + " poster"}
                />
                <div className="card--content">
                  <h3 className="card--title">{movie.title}</h3>
                  <p>
                    <small>RELEASE DATE: {movie.release_date}</small>
                  </p>
                  <p>
                    <small>RATING: {movie.vote_average}</small>
                  </p>
                  <p className="card--desc">{movie.overview}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
