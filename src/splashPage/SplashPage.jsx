import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import TopBar from "../layout/TopBar";
import Typography from "@mui/material/Typography";
import { useAuth } from "../auth/AuthContext";

export default function SplashPage() {
  const { user, openAuthModal } = useAuth();

  return (
    <Box component="main" sx={{ display: "flex", flexDirection: "column" }}>
      <TopBar />
      <Toolbar />
      <Typography variant="h4">REELCREW - WATCH TOGETHER</Typography>
      <Typography variant="h5">Watch together, on time.</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A, aspernatur!
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={!user ? openAuthModal : undefined}>
          Start Watch Group
        </Button>
        <Button variant="outlined">Browse Films</Button>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Typography>Stat1</Typography>
        <Typography>Stat2</Typography>
        <Typography>Stat3</Typography>
      </Stack>
    </Box>
  );
}
