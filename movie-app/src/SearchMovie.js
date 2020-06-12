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
  );
}
