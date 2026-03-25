import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getUserWatched, getUserGroups } from "../api/users";
import RecentlyWatched from "./RecentlyWatched";
import ProfileGroupCard from "./ProfileGroupCard";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ProfileHeader from "./ProfileHeader";
import StatCards from "./StatCards";

/** Displays the logged-in user's profile — stats, header info, and recently watched films. */
export default function ProfilePage() {
  const { user } = useAuth();
  const [watched, setWatched] = useState([]);
  const [groups, setGroups] = useState([]);

  // Fetch both stats on mount — skips if user isn't loaded yet (auth rehydration)
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
      <ProfileHeader />
      <Divider />
      <StatCards filmsLogged={watched.length} groupsJoined={groups.length} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 2,
          margin: 1,
        }}>
        <RecentlyWatched films={watched} />
        <ProfileGroupCard groups={groups} />
      </Box>
    </Box>
  );
}
