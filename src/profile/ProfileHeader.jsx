import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

import { getInitials } from "../watches/MemberList";
import { useAuth } from "../auth/AuthContext";

export default function ProfileHeader() {
  const { user } = useAuth();
  if (!user) return <p>Loading...</p>;
  const initials = getInitials(user.display_name);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: "5px",
      }}>
      <Avatar sx={{ width: 80, height: 80 }}>{initials}</Avatar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          gap: "5px",
          padding: "16px",
        }}>
        <Typography variant="h4">{user.display_name}</Typography>
        <Typography variant="body2">
          @{user.username} - Member since 2024
        </Typography>
        <Box>
          <Chip label="Group Host" />
        </Box>
      </Box>
    </Box>
  );
}
