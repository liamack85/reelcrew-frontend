import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getUserWatched, getUserGroups } from "../api/users";
import RecentlyWatched from "./RecentlyWatched";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import ProfileHeader from "./ProfileHeader";
import StatCards from "./StatCards";

export default function ProfilePage() {
  const { user } = useAuth();
  const [watched, setWatched] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (!user) return;
    async function fetchStats() {
      const watchedFilms = await getUserWatched(user.id);
      setWatched(watchedFilms);
      const userGroups = await getUserGroups(user.id);
      setGroups(userGroups);
    }
    fetchStats();
  }, [user]);

  return (
    <Box>
      <Toolbar />
      <ProfileHeader />
      <Divider />
      <StatCards filmsLogged={watched.length} groupsJoined={groups.length} />
      <RecentlyWatched films={watched} />
    </Box>
  );
}
