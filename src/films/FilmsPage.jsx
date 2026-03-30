import { useEffect, useRef, useState } from "react";
import { getAllUserFilms } from "../api/users";
import { getFilms } from "../api/films";
import { useAuth } from "../auth/AuthContext";
import FilmCard, { FilmCardSkeleton } from "./FilmCard";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

/* A React component that fetches and displays a list of 
films */
export default function FilmsPage() {
  const { token } = useAuth();
  const [films, setFilms] = useState(null);
  const [query, setQuery] = useState("");
  /* Tracks current page number for pagination and 
  films per page */
  const [page, setPage] = useState(1);
  const [watchlistIds, setWatchlistIds] = useState(new Set());
  const filmsPerPage = 10;
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

  const syncWatchlist = async () => {
    if (!token) return;
    const data = await getAllUserFilms(token);
    setWatchlistIds(new Set(data.map((userFilm) => userFilm.film_id)));
  };

  useEffect(() => {
    syncWatchlist();
  }, [token]);

  /* Reset pagination to page 1 when search query changes */
  useEffect(() => {
    setPage(1);
  }, [query]);

  if (films === null)
    return (
      <section>
        <Typography color="primary" variant="h2">
          Films
        </Typography>
        <Stack
          spacing={2}
          component="ul"
          sx={{ listStyle: "none", padding: 0 }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <FilmCardSkeleton key={i} />
          ))}
        </Stack>
      </section>
    );

  /* Gets starting index from current page */
  const startIndex = (page - 1) * filmsPerPage;
  /* Slices a subset of films for the current page */
  const paginatedFilms = films.slice(startIndex, startIndex + filmsPerPage);

  /* Controlled input for the search function. Updates
  query state on change and triggers the debounced fetch.
  Prevents page reload on enter. */
  return (
    <section>
      <Typography color="primary" variant="h2">
        Films
      </Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          type="search"
          placeholder="Search films..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {films.length === 0 ? (
        <p>No films found.</p>
      ) : (
        <>
          <Stack
            spacing={2}
            component="ul"
            sx={{ listStyle: "none", padding: 0 }}
          >
            {paginatedFilms.map((film) => (
              <FilmCard
                key={film.id}
                film={film}
                token={token}
                isOnWatchlist={watchlistIds.has(film.id)}
                onWatchlistChange={syncWatchlist}
              />
            ))}
          </Stack>
          <Pagination
            count={Math.ceil(films.length / filmsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
          />
        </>
      )}
    </section>
  );
}
