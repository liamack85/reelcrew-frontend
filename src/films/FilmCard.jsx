import { addToWatchlist } from "../api/films";

export default function FilmCard({ film, token }) {
  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist(token, film.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <li>
      <img src={film.poster_url} alt={film.title} />
      <h2>{film.title}</h2>
      <h3>{film.genre}</h3>
      <h3>{film.year}</h3>
      <h3>{film.director}</h3>
      {film.rating && <p>⭐ {film.rating}</p>}
      {token && <button onClick={handleAddToWatchlist}>+ Watchlist</button>}
    </li>
  );
}
