import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router";
import FeaturedGroup from "./FeaturedGroup";

/**
 *  Public landing page. Lazy-gates the "Start Watch Group" button —
 *  opens auth modal if logged out, navigates to /groups if logged in.
 */
export default function SplashPage() {
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  return (
    <Stack direction="row" sx={{ margin: 5, gap: 4, alignItems: "center" }}>
      {/* existing hero content in a Box */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography color="primary" variant="s1">
          REELCREW • WATCH TOGETHER
        </Typography>
        <Typography variant="h2">Watch together,</Typography>
        <Typography color="primary" fontStyle="italic" variant="h2">
          on time.
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
          aspernatur!
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
        <Stack
          direction="row"
          sx={{ gap: "10px", padding: "10px", justifyContent: "space-around" }}>
          <Card
            variant="outlined"
            sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5">2,384</Typography>
              <Typography variant="body2">Groups Active</Typography>
            </CardContent>
          </Card>
          <Card
            variant="outlined"
            sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5">9,423</Typography>
              <Typography variant="body2">Films Watched</Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
      <FeaturedGroup />
    </Stack>
  );
}
