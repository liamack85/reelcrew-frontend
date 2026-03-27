import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { getInitials } from "../watches/MemberList";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router";

/** Displays the logged-in user's avatar with a dropdown menu for navigation and logout. */
export default function UserAvatar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Stores a reference to the clicked HTML element (event.currentTarget)
  // Starts closed = null, no menu visible
  const [anchorEl, setAnchorEl] = useState(null);

  function handleOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  // stopPropagation lets clicks outside Avatar trigger handleClose
  // prevents issue of dropdown remaining open after click outside element
  function handleClose(event) {
    event.stopPropagation();
    setAnchorEl(null);
  }
  function handleLogout() {
    logout();
    navigate("/");
  }

  if (!user) return null;

  const initials = getInitials(user.display_name);
  return (
    <Box
      onClick={handleOpen}
      sx={{
        display: "flex",
        flexDirection: "row",
        cursor: "pointer",
        ml: 1,
        gap: 1,
      }}>
      <Avatar sx={{ fontSize: "1rem" }}>{initials}</Avatar>
      <Box>
        <Typography>{user.display_name}</Typography>
        <Typography variant="body2">Random Stats</Typography>
      </Box>
      {/* open={Boolean(anchorEl)} — truthy HTML element = menu open, null = closed
          anchorEl also tells Menu where to position relative to the trigger element*/}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}>
        <MenuItem disabled>@{user.username}</MenuItem>
        <MenuItem onClick={() => navigate("/users/me")}>Profile</MenuItem>
        <MenuItem onClick={() => navigate("/users/me/watchlist")}>
          My Watchlist
        </MenuItem>
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    </Box>
  );
}
