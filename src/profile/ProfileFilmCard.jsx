import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { updateFilmStatus } from "../api/films";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

/**
 * A vertical film card showing the poster, title, and an optional status badge.
 * Used in UserWatchlist (badge visible) and RecentlyWatched (badge hidden via showBadge={false}).
 *
 * The status badge anchors right when 'watched' and left when 'watchlist',
 * and is always pinned to the bottom of the card regardless of title length.
 *
 * @param {{ film: Object, showBadge?: boolean }} props
 * @param {Object} props.film - User film object. Expected fields: id, film_id, title, poster_url, status.
 * @param {boolean} [props.showBadge=true] - Whether to show the watched/watchlist toggle chip.
 */
export default function FilmPoster({ film, showBadge = true }) {
  const { token } = useAuth();
  const [status, setStatus] = useState(film.status);

  const handleToggle = async () => {
    const newStatus = status === "watched" ? "watchlist" : "watched";
    await updateFilmStatus(token, film.id, newStatus);
    setStatus(newStatus);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 1,
        borderRadius: 2,
        width: "100%",
      }}
    >
      <CardMedia
        component="img"
        image={film.poster_url || "https://placehold.co/90x135?text=No+Poster"}
        alt={film.title}
        sx={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          borderRadius: 1,
        }}
      />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <Typography
          variant="body2"
          component={Link}
          to={"/films/" + film.film_id}
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          {film.title}
        </Typography>
        {showBadge && (
          <Box
            sx={{
              display: "flex",
              justifyContent: status === "watched" ? "flex-end" : "flex-start",
              mt: "auto",
            }}
          >
            <Chip
              label={status === "watched" ? "Watched" : "Watchlist"}
              color={status === "watched" ? "success" : "default"}
              size="small"
              onClick={handleToggle}
              sx={{ cursor: "pointer" }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
