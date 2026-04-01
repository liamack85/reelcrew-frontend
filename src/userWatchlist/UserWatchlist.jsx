import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getAllUserFilms } from "../api/users";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FilmPoster from "../profile/ProfileFilmCard";

/**
 *  Displays all films in the logged-in user's watchlist and watch history.
 *  Requires an auth token — protected endpoint.
 */
export default function UserWatchlist() {
  const { token } = useAuth();
  const [films, setFilms] = useState([]);

  // Guards on token rather than user — getAllUserFilms is a protected endpoint
  // that requires the auth header, not just the user object
  useEffect(() => {
    if (!token) return;
    async function fetchFilms() {
      const result = await getAllUserFilms(token);
      setFilms(result);
    }
    fetchFilms();
  }, [token]);

  if (films === null) return <Typography>Loading...</Typography>;

  if (films.length === 0)
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4">My Watchlist</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          No films in your watchlist yet!
        </Typography>
      </Box>
    );

  const watched = films.filter((f) => f.status === "watched");
  const watchlist = films.filter((f) => f.status === "watchlist");

  return (
    <Box sx={{ padding: 3, display: "flex", flexDirection: "column", gap: 4 }}>
      {watchlist.length > 0 && (
        <Box>
          <Typography color="primary" variant="h2" sx={{ mb: 2 }}>
            Watchlist
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(5, 1fr)",
                xl: "repeat(6, 1fr)",
              },
              gap: 2,
            }}>
            {watchlist.map((film) => (
              <FilmPoster
                key={film.id}
                film={film}
                onRemove={(id) => setFilms(films.filter((f) => f.id !== id))}
              />
            ))}
          </Box>
        </Box>
      )}
      {watched.length > 0 && (
        <Box>
          <Typography color="primary" variant="h2" sx={{ mb: 2 }}>
            Watched
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(5, 1fr)",
                xl: "repeat(6, 1fr)",
              },
              gap: 2,
            }}>
            {watched.map((film) => (
              <FilmPoster
                key={film.id}
                film={film}
                onRemove={(id) => setFilms(films.filter((f) => f.id !== id))}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
