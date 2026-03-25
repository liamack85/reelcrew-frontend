import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { drawerWidth } from "./constants";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import TopBar from "./TopBar";
import UserAvatar from "./Avatar";

import HomeIcon from "@mui/icons-material/Home";
import TheatersIcon from "@mui/icons-material/Theaters";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const navItems = [
  { text: "Home", icon: HomeIcon, path: "/" },
  { text: "Films", icon: TheatersIcon, path: "/films" },
  { text: "Groups", icon: GroupsIcon, path: "/groups" },
  { text: "Profile", icon: AccountBoxIcon, path: "/users/me" },
];

/**
 * Permanent left-side navigation drawer. Shows nav links, opens the auth modal
 * for protected routes when logged out, and renders the user avatar when logged in.
 */
export default function Sidebar() {
  const { user, openAuthModal } = useAuth();

  return (
    <Box sx={{ display: "flex" }}>
      <TopBar />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left">
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {navItems.map(({ text, icon: Icon, path }) => (
              <ListItem key={text} disablePadding>
                {/* Profile is the only navItem that requires auth - opens modal instead of navigating if logged out */}
                {text === "Profile" && !user ? (
                  <ListItemButton onClick={openAuthModal}>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                ) : (
                  <ListItemButton component={NavLink} to={path}>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
        {user ? (
          <UserAvatar />
        ) : (
          <Button onClick={openAuthModal}>Log In / Register</Button>
        )}
      </Drawer>
    </Box>
  );
}
