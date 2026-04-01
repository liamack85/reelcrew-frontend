import { useEffect, useState } from "react";
import { getGroups, getCurrentWatchForGroup } from "../api/groups";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { formatDate } from "../watches/MemberList";

export default function FeaturedGroup() {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    async function getGroup() {
      const groups = await getGroups();
      if (groups?.length) {
        const watch = await getCurrentWatchForGroup(groups[0].id);
        if (watch) setGroup(watch);
      }
    }
    getGroup();
  }, []);

  if (!group) return null;

  const progress = group.progress?.percent ?? 0;
  const dueDate = formatDate(group.deadline);

  return (
    <Card sx={{ maxWidth: 400 }}>
      {/* Film poster placeholder */}
      <Box sx={{ bgcolor: "error.main", height: 200 }} />
      <CardContent>
        <Typography variant="h6">{group.group_name}</Typography>
        <Typography variant="body2">
          {group.progress?.members.length} members · Due {dueDate}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ flexGrow: 1 }}
          />
          <Typography variant="body2">{Math.round(progress)}%</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
