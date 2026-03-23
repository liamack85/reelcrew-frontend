import { useEffect, useRef, useState } from "react";
import { getFilms } from "../api/films";
import { useAuth } from "../auth/AuthContext";
import FilmCard from "./FilmCard";
import Stack from "@mui/material/Stack";

export default function FilmsPage() {
  const { token } = useAuth();
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
        <Stack
          spacing={2}
          component="ul"
          sx={{ listStyle: "none", padding: 0 }}
        >
          {films.map((film) => (
            <FilmCard key={film.id} film={film} token={token} />
          ))}
        </Stack>
      )}
    </section>
  );
}
