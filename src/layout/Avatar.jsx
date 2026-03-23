import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getInitials } from "../watches/MemberList";
import { useAuth } from "../auth/AuthContext";

export default function UserAvatar() {
  const { user } = useAuth();
  if (!user) return null;

  const initials = getInitials(user.display_name);
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Avatar>{initials}</Avatar>
      <Box>
        <Typography>{user.display_name}</Typography>
        <Typography>91% on-time</Typography>
      </Box>
    </Box>
  );
}
