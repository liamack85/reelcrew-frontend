import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/**
 * Displays a list of group members with their role, watch status, and avatar initials.
 *
 * @param {Object} props
 * @param {Array} props.members Array of member objects from the group watch progress data
 */

export default function MemberList({ members }) {
  if (!members) {
    return <Typography>There are no members. Add some!</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Members
      </Typography>
      <Stack spacing={1}>
        {members.map((member) => (
          <Box
            key={member.user_id}
            sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ width: 40, height: 40 }}>
              {getInitials(member.display_name)}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography variant="body1">{member.display_name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {member.role === "host" ? "Host" : "Member"}
                {member.status === "watched" && member.watched_at
                  ? " · Watched " + formatDate(member.watched_at)
                  : " · Pending"}
              </Typography>
            </Box>

            <Chip
              label={member.status === "watched" ? "Watched" : "Pending"}
              color={member.status === "watched" ? "success" : "default"}
              size="small"
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

/**
 * Extracts the first letter of each word in a name to create avatar initials.
 *
 * @param {string} name a user's display name
 * @returns {string} uppercase initials (e.g. "Big Terry" → "BT")
 */

export function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/**
 * Formats a date string into a short, readable format.
 *
 * @param {string} dateString - An ISO date string
 * @returns {string} Formatted date (e.g. "Mar 24")
 */

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
