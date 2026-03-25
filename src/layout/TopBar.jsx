import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function TopBar() {
  return (
    // zIndex must exceed the Drawer's to prevent the AppBar from rendering behind the sidebar
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          REEL CREW
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
