import { useNavigate } from "react-router";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

/**
 * Displays a list of groups the user belongs to.
 * Each card shows the group name, active film, member count,
 * days until deadline, and member watch progress.
 *
 * @param {{ groups: Array }} props
 * @param {Array} props.groups - Enriched group objects from GET /users/:id/groups.
 *   Expected fields: id, name, film_title, member_count, deadline, watched_count.
 */
export default function ProfileGroupCard({ groups }) {
  const navigate = useNavigate();
  return (
    <Stack spacing={2}>
      {groups.map((group) => {
        // Percentage of members who have marked the active watch as watched
        // Guard against division by zero if group has no members
        const progress =
          group.member_count > 0
            ? (group.watched_count / group.member_count) * 100
            : 0;

        // null if group has no active watch
        const daysLeft = group.deadline
          ? Math.ceil(
              (new Date(group.deadline) - new Date()) / (1000 * 60 * 60 * 24),
            )
          : null;
        return (
          <Stack key={`${group.id}-${group.deadline}`}>
            <Stack direction="row" justifyContent="space-between">
              <Typography>{group.name}</Typography>
              <ArrowForwardIcon
                onClick={() => navigate(`/groups/${group.id}`)}
              />
            </Stack>
            <Stack>
              <Typography>{group.film_title}</Typography>
            </Stack>
            <Typography variant="body2">
              {group.member_count} Members ·{" "}
              {/* null if group has no active watch */}
              {daysLeft !== null ? `${daysLeft} days left` : "No active watch"}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ flexGrow: 1 }}
              />
              <Typography variant="body2">{Math.round(progress)}%</Typography>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
}
