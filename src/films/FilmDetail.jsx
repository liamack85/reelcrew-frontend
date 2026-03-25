import { getFilmById } from "#src/api/films";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";

/* A React component that fetches and displays detailed information
about one single film by film id. Will also allow authenticated
user to add film to watchlist */
export default function FilmDetail() {
  const { token } = useAuth();
  const { id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    const syncFilm = async () => {
      const data = await getFilmById(id);
      setFilm(data);
    };
    syncFilm();
  }, [id]);

  if (!film) return <p>Loading...</p>;

  return (
    <article>
      <img src={film.poster_url} alt={film.title} />
      <section>
        <h1>{film.title}</h1>
        <p>{film.year}</p>
        <p>{film.genre}</p>
        <p>{film.director}</p>
        <p>{film.runtime}</p>
        {film.rating && <p>⭐ {film.rating}</p>}
        <p>{film.description}</p>
        {token && <button>Add to Watchlist</button>}
      </section>
    </article>
  );
}
