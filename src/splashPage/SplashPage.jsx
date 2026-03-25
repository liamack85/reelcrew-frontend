import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TopBar from "../layout/TopBar";
import Typography from "@mui/material/Typography";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router";

/**
 *  Public landing page. Lazy-gates the "Start Watch Group" button —
 *  opens auth modal if logged out, navigates to /groups if logged in.
 */
export default function SplashPage() {
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  return (
    <Box component="main" sx={{ display: "flex", flexDirection: "column" }}>
      <TopBar />
      <Typography variant="h4">REELCREW - WATCH TOGETHER</Typography>
      <Typography variant="h5">Watch together, on time.</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A, aspernatur!
      </Typography>
      <Stack direction="row" spacing={2}>
        {/* Lazy gate — opens auth modal if logged out, navigates to groups if logged in */}
        <Button
          variant="contained"
          onClick={!user ? openAuthModal : () => navigate("/groups")}>
          Start Watch Group
        </Button>
        <Button variant="outlined" onClick={() => navigate("/films")}>
          Browse Films
        </Button>
      </Stack>
      <Stack direction="row" spacing={2}>
        {/* TODO: replace with real app stats from the API */}
        <Typography>Stat1</Typography>
        <Typography>Stat2</Typography>
        <Typography>Stat3</Typography>
      </Stack>
    </Box>
  );
}
