import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getAllUserFilms } from "../api/users";
import Box from "@mui/material/Box";
import FilmPoster from "../profile/ProfileFilmCard";
import Toolbar from "@mui/material/Toolbar";

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

  return (
    <Box sx={{ padding: 2 }}>
      <Toolbar />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          mt: 2,
        }}>
        {films.map((film) => (
          <FilmPoster key={film.id} film={film} />
        ))}
      </Box>
    </Box>
  );
}
