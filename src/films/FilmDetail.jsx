import { getFilmById, addToWatchlist } from "../api/films";
import { getAllUserFilms } from "../api/users";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

export default function FilmDetail() {
  const { token } = useAuth();
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const syncFilm = async () => {
      const data = await getFilmById(id);
      setFilm(data);
    };
    syncFilm();
  }, [id]);

  useEffect(() => {
    const syncWatchlist = async () => {
      if (!token) return;
      const data = await getAllUserFilms(token);
      const isAdded = data.some((uf) => uf.film_id === parseInt(id));
      setAdded(isAdded);
    };
    syncWatchlist();
  }, [token, id]);

  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist(token, film.id);
      setAdded(true);
    } catch (e) {
      console.error(e);
    }
  };

  if (!film) return <Typography>Loading...</Typography>;

  return (
    <Box
      component="article"
      sx={{
        display: "flex",
        gap: 4,
        padding: 3,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box
        component="img"
        src={film.poster_url}
        alt={film.title}
        sx={{
          width: { xs: "100%", sm: 250 },
          borderRadius: 2,
          objectFit: "cover",
          flexShrink: 0,
        }}
      />
      <Box
        component="section"
        sx={{ display: "flex", flexDirection: "column", gap: 1 }}
      >
        <Typography variant="h4" component="h1">
          {film.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {film.year} · {film.director} · {film.runtime}
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {film.genre &&
            film.genre
              .split(", ")
              .map((g) => <Chip key={g} label={g} size="small" />)}
        </Stack>
        {film.rating && (
          <Typography variant="body2">⭐ {film.rating} / 10</Typography>
        )}
        <Divider />
        <Typography variant="body1">{film.description}</Typography>
        {token && (
          <Button
            variant="contained"
            onClick={handleAddToWatchlist}
            disabled={added}
            sx={{ width: "fit-content", mt: 1 }}
          >
            {added ? "Added to Watchlist!" : "+ Watchlist"}
          </Button>
        )}
      </Box>
    </Box>
  );
}
