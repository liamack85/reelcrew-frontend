import { useNavigate } from "react-router";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function ProfileGroupCard({ groups }) {
  const navigate = useNavigate();
  return (
    <Stack spacing={2}>
      {groups.map((group) => (
        <Stack key={group.id}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>{group.name}</Typography>
            <ArrowForwardIcon onClick={() => navigate(`/groups/${group.id}`)} />
          </Stack>
          <Typography variant="body2">4 members · 3 days left</Typography>
        </Stack>
      ))}
    </Stack>
  );
}
