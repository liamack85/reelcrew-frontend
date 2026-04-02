import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router";
import FeaturedGroup from "./FeaturedGroup";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CheckCircle from "@mui/icons-material/CheckCircle";

/**
 *  Public landing page. Lazy-gates the "Start Watch Group" button —
 *  opens auth modal if logged out, navigates to /groups if logged in.
 */
export default function SplashPage() {
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  return (
    <Stack direction="row" sx={{ margin: 5, gap: 4, alignItems: "center" }}>
      {/* flex: 1 lets the hero take all remaining space, pushing FeaturedGroup to the right */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography color="primary" variant="s1">
          REELCREW • WATCH TOGETHER
        </Typography>
        <Typography variant="h2">Watch together,</Typography>
        <Typography color="primary" fontStyle="italic" variant="h2">
          on time.
        </Typography>
        <Typography variant="body1" component="p">
          Plan, pick, and watch together. Browse films, build your personal watchlist, create or join watch groups, and sync progress so everyone hits the same deadline — no scheduling chaos required.
        </Typography>
    <List>
      <ListItem>
        <ListItemAvatar>
            <CheckCircle color="secondary" />
        </ListItemAvatar>
        <ListItemText>Browse curated films and personalized picks</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
            <CheckCircle color="secondary" />
        </ListItemAvatar>
        <ListItemText>Build and share private watchlists</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
            <CheckCircle color="secondary" />
        </ListItemAvatar>
        <ListItemText>Join groups to track progress and meet shared deadlines</ListItemText>
      </ListItem>
    </List>        
        
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
        <Stack direction="row" sx={{ gap: "20px", padding: "10px", ml: 2 }}>
          <Card
            variant="outlined"
            sx={{ display: "flex", flexDirection: "column", minWidth: 180 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5">2,384</Typography>
              <Typography variant="body2">Groups Active</Typography>
            </CardContent>
          </Card>
          <Card
            variant="outlined"
            sx={{ display: "flex", flexDirection: "column", minWidth: 180 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5">9,423</Typography>
              <Typography variant="body2">Films Watched</Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
      <Box sx={{ display: { flex: 1, xs: "none", md: "block" } }}>
        <FeaturedGroup />
      </Box>
    </Stack>
  );
}
