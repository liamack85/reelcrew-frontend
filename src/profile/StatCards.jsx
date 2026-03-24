import Stack from "@mui/material/Stack";
import StatCard from "./StatCard";

export default function StatCards({ filmsLogged, groupsJoined }) {
  return (
    <Stack
      direction="row"
      sx={{ gap: "10px", padding: "10px", justifyContent: "space-around" }}>
      <StatCard value={filmsLogged} label="Films logged" />
      <StatCard value={groupsJoined} label="Groups Joined" />
      <StatCard value="91%" label="On-time rate" />
    </Stack>
  );
}
