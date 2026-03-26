import { addToWatchlist } from "../api/films";
import { useState } from "react";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

/* A reusable React component that displays film information.
An authenticated user can add a film to their watchlist */
export default function FilmCard({ film, token, isOnWatchlist }) {
  const [added, setAdded] = useState(isOnWatchlist);

  /* Calls API with token and film id. Updates UI on
  success, logs error on failure. */
  const handleAddToWatchlist = async () => {
    try {
      await addToWatchlist(token, film.id);
      setAdded(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card sx={{ display: "flex", gap: 2, padding: 1 }}>
      <CardMedia
        component="img"
        image={film.poster_url}
        alt={film.title}
        sx={{ width: 80, objectFit: "cover", borderRadius: 1 }}
      />
      <CardContent sx={{ flex: 1, padding: 0 }}>
        <Typography
          variant="h6"
          component={Link}
          to={"/films/" + film.id}
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          {film.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {film.year} · {film.director}
        </Typography>
        {film.genre && (
          <Chip label={film.genre} size="small" sx={{ mt: 0.5 }} />
        )}
        {film.rating && (
          <Typography variant="body2">⭐ {film.rating}</Typography>
        )}
      </CardContent>
      <CardActions sx={{ alignSelf: "flex-end", padding: 0 }}>
        {token && (
          <Button
            size="small"
            variant="contained"
            onClick={handleAddToWatchlist}
            disabled={added}
          >
            {added ? "Added!" : "+ Watchlist"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
