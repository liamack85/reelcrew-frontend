import { useEffect, useRef, useState } from "react";
import { getFilms } from "../api/films";
import FilmCard from "./FilmCard";

export default function FilmsPage() {
  const [films, setFilms] = useState(null);
  const [query, setQuery] = useState("");
  const debounce = useRef();

  useEffect(() => {
    const syncFilms = async () => {
      const data = await getFilms(query);
      setFilms(data);
    };

    clearTimeout(debounce.current);
    debounce.current = setTimeout(syncFilms, 300);
    return () => clearTimeout(debounce.current);
  }, [query]);

  if (films === null) return <p>Loading...</p>;

  return (
    <section>
      <h1>Films</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          placeholder="Search films..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {films.length === 0 ? (
        <p>No films found.</p>
      ) : (
        <ul>
          {films.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </ul>
      )}
    </section>
  );
}
