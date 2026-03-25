import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

export default function FilmPoster({ film }) {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
      <CardMedia
        component="img"
        image={film.poster_url}
        alt={film.title}
        sx={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
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
          label={film.status === "watched" ? "Watched" : "Watchlist"}
          color={film.status === "watched" ? "success" : "default"}
          size="small"
        />
      </CardContent>
    </Card>
  );
}
