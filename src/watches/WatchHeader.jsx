import { useParams } from "react-router";
import { Link } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

/**
 * Displays the top header for a watch event page.
 * @param {{ watch: Object }} props
 */
export default function WatchHeader({ watch }) {
  const { id } = useParams();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, padding: 1 }}>
      <Link to={"/groups/" + id}>back to group</Link>
      <Typography variant="h2">{watch.group_name}</Typography>
      <Typography variant="body2" color="text.secondary">
        {watch.progress?.members?.length} members · Watch group
      </Typography>
    </Box>
  );
}
