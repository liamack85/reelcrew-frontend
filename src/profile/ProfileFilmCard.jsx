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
 *  A vertical film card showing the poster, title, and watch status.
 *  Falls back to a colored box if no poster is available.
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
    <Card sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
      <CardMedia
        component="img"
        image={film.poster_url}
        alt={film.title}
        sx={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
          borderRadius: 1,
        }}
      />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Typography
          variant="body2"
          component={Link}
          to={"/films/" + film.film_id}
          sx={{ textDecoration: "none", color: "inherit" }}>
          {film.title}
        </Typography>
        {showBadge && (
          <Box
            sx={{
              display: "flex",
              justifyContent: status === "watched" ? "flex-end" : "flex-start",
              mt: "auto",
            }}>
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
