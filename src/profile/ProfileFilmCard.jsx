import { Link } from "react-router";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { updateFilmStatus, removeFromWatchlist } from "../api/films";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

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
export default function FilmPoster({ film, showBadge = true, onRemove }) {
  const { token } = useAuth();
  const [status, setStatus] = useState(film.status);

  const handleToggle = async () => {
    const newStatus = status === "watched" ? "watchlist" : "watched";
    await updateFilmStatus(token, film.id, newStatus);
    setStatus(newStatus);
  };

  const handleRemove = async () => {
    try {
      await removeFromWatchlist(token, film.id);
      onRemove(film.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 1,
        borderRadius: 2,
        width: "100%",
      }}>
      {/* Top row: title left, delete button right */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: 40,
          mb: 1,
        }}>
        <Box sx={{ flex: 1, overflow: "hidden" }}>
          <Tooltip title="To Film Details" placement="top-start">
            <Typography
              variant="body2"
              component={Link}
              to={"/films/" + film.film_id}
              sx={{
                textDecoration: "none",
                color: "inherit",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>
              {film.title}
            </Typography>
          </Tooltip>
        </Box>
        {onRemove && (
          <Tooltip title="Remove" placement="top-end">
            <IconButton
              size="small"
              onClick={handleRemove}
              sx={{ alignSelf: "flex-start" }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
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
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          padding: "4px 0 0 0",
          "&:last-child": { paddingBottom: "4px" },
        }}>
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
