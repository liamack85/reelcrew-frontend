import { Outlet } from "react-router";
import { drawerWidth } from "./constants";
import AuthModal from "../auth/AuthModal";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar";
import Toolbar from "@mui/material/Toolbar";

/** Root page layout — renders the Sidebar, the auth modal, and the current route's page via Outlet. */
export default function Layout() {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: `${drawerWidth}px 1fr` }}>
      <Sidebar />
      <AuthModal />
      <main>
        <Toolbar />
        <Outlet />
      </main>
    </Box>
  );
}
