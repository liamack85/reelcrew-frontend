import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FilmPoster from "./ProfileFilmCard";

/** Displays a grid of up to 8 recently watched film posters on the profile page. */
export default function RecentlyWatched({ films }) {
  return (
    <Box>
      <Typography>Recently Watched</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(5, 1fr)",
          },
          gap: 2,
          mt: 1,
        }}>
        {/* Limits to 8 most recent — ordered by id DESC from the API */}
        {films.slice(0, 8).map((film) => (
          <FilmPoster key={film.id} film={film} showBadge={false} />
        ))}
      </Box>
    </Box>
  );
}
