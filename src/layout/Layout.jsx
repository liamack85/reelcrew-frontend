import { Outlet } from "react-router";
import { drawerWidth } from "./constants";
import AuthModal from "../auth/AuthModal";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: `${drawerWidth}px 1fr` }}>
      <Sidebar />
      <AuthModal />
      <main>
        <Outlet />
      </main>
    </Box>
  );
}
