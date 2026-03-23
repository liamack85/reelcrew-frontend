import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

import UserAvatar from "./Avatar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TopBar from "./TopBar";

import HomeIcon from "@mui/icons-material/Home";
import TheatersIcon from "@mui/icons-material/Theaters";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const drawerWidth = 200;

const navItems = [
  { text: "Home", icon: HomeIcon, path: "/" },
  { text: "Films", icon: TheatersIcon, path: "/films" },
  { text: "Groups", icon: GroupsIcon, path: "/watch-groups" },
  { text: "Profile", icon: AccountBoxIcon, path: "/users/me" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

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
                <ListItemButton component={NavLink} to={path}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <UserAvatar />
      </Drawer>
    </Box>
  );
}
