import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import ProfileHeader from "./ProfileHeader";
import StatCards from "./StatCards";

export default function ProfilePage() {
  return (
    <Box>
      <Toolbar />
      <ProfileHeader />
      <Divider />
      <StatCards />
    </Box>
  );
}
