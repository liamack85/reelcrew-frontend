import { Link } from "react-router";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

/**
 * Displays the top header for a watch event page.
 * @param {{ watch: Object }} props
 */
export default function WatchHeader({ watch }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, padding: 1 }}>
      <Link to={"/groups/" + watch.group_id}>back to group</Link>
      <Typography variant="h2">{watch.group_name}</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {watch.member_count} members · Watch group
        </Typography>
        <Chip label={watch.status} color={watch.status === "complete" ? "success" : ""} size="small" />
      </Box>
    </Box>
  );
}