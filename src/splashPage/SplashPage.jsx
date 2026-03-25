import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
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
    <Box
      component="main"
      sx={{ display: "flex", flexDirection: "column", margin: 5, gap: 1 }}>
      <Typography color="primary" variant="s1">
        REELCREW • WATCH TOGETHER
      </Typography>
      <Typography variant="h2">Watch together,</Typography>
      <Typography color="primary" fontStyle="italic" variant="h2">
        on time.
      </Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A, aspernatur!
      </Typography>
      <Stack direction="row" spacing={2}>
        {/* Lazy gate — opens auth modal if logged out, navigates to groups if logged in */}
        <Button
          variant="contained"
          size="large"
          sx={{ px: 4, py: 2, fontSize: "1.2rem", fontWeight: "700" }}
          onClick={!user ? openAuthModal : () => navigate("/groups")}>
          Start Watch Group ▶
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate("/films")}
          sx={{ px: 2, fontSize: "1.1rem", fontWeight: "500" }}>
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
