import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { updateFilmStatus } from "../api/films";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

/**
 *  A vertical film card showing the poster, title, and watch status.
 *  Falls back to a colored box if no poster is available.
 */
export default function FilmPoster({ film }) {
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
      <CardContent>
        <Typography
          variant="h6"
          component={Link}
          to={"/films/" + film.id}
          sx={{ textDecoration: "none", color: "inherit" }}>
          {film.title}
        </Typography>
        <Chip
          label={status === "watched" ? "Watched" : "Watchlist"}
          color={status === "watched" ? "success" : "default"}
          size="small"
          onClick={handleToggle}
          sx={{ cursor: "pointer" }}
        />
      </CardContent>
    </Card>
  );
}
