import { useEffect, useRef, useState } from "react";
import { getFilms } from "../api/films";
import { useAuth } from "../auth/AuthContext";
import FilmCard from "./FilmCard";
import Stack from "@mui/material/Stack";

/* A React component that fetches and displays a list of 
films */
export default function FilmsPage() {
  const { token } = useAuth();
  const [films, setFilms] = useState(null);
  const [query, setQuery] = useState("");
  const debounce = useRef();

  /* Search logic  with error catch that runs when query 
  changes using getFilms. */
  useEffect(() => {
    const syncFilms = async () => {
      try {
        const data = await getFilms(query);
        setFilms(data);
      } catch (err) {
        console.error(err);
      }
    };

    /* Clears previous timeout preventing unintended API calls.
    300 ms debounce timer before request is fired. */
    clearTimeout(debounce.current);
    debounce.current = setTimeout(syncFilms, 300);
    return () => clearTimeout(debounce.current);
  }, [query]);

  if (films === null) return <p>Loading...</p>;

  /* Controlled input for the search function. Updates
  query state on change and triggers the debounced fetch.
  Prevents page reload on enter. */
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
          {/* Displays matched results */}
          {films.map((film) => (
            <FilmCard key={film.id} film={film} token={token} />
          ))}
        </Stack>
      )}
    </section>
  );
}
