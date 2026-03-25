import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FilmPoster from "./ProfileFilmCard";

export default function RecentlyWatched({ films }) {
  return (
    <Box>
      <Typography>Recently Watched</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          mt: 1,
        }}>
        {films.slice(0, 8).map((film) => (
          <FilmPoster key={film.id} film={film} />
        ))}
      </Box>
    </Box>
  );
}
