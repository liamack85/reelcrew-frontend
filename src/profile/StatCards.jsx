import Stack from "@mui/material/Stack";
import StatCard from "./StatCard";

export default function StatCards() {
  return (
    <Stack
      direction="row"
      sx={{ gap: "10px", padding: "10px", justifyContent: "space-around" }}>
      <StatCard value={47} label="Films logged" />
      <StatCard value={6} label="Groups Joined" />
      <StatCard value="91%" label="On-time rate" />
    </Stack>
  );
}
