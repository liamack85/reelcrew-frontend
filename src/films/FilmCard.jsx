import { addToWatchlist } from "../api/films";
import { useState } from "react";
import { Link } from "react-router";

export default function FilmCard({ film, token }) {
  const [added, setAdded] = useState(false);

  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist(token, film.id);
      setAdded(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <li>
      <img src={film.poster_url} alt={film.title} />
      <Link to={"/films/" + film.id}>
        <h2>{film.title}</h2>
      </Link>
      <h3>{film.genre}</h3>
      <h3>{film.year}</h3>
      <h3>{film.director}</h3>
      {film.rating && <p>⭐ {film.rating}</p>}
      {token && (
        <button onClick={handleAddToWatchlist} disabled={added}>
          Add to Watchlist
        </button>
      )}
    </li>
  );
}
