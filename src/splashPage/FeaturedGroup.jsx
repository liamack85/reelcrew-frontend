import { useEffect, useState } from "react";
import { getGroups, getWatchesByGroup } from "../api/groups";
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
        const data = await getWatchesByGroup(groups[0].id);
        setGroup({ ...groups[0], ...data[0], watches: data });
      }
    }
    getGroup();
  }, []);

  if (!group) return null;

  const watchedCount = group.watches.filter(
    (w) => w.status === "watched",
  ).length;
  const progress =
    Number(group.member_count) > 0
      ? (watchedCount / Number(group.member_count)) * 100
      : 0;

  const dueDate = formatDate(group.deadline);
  return (
    <Card>
      {/* Film poster placeholder */}
      <Box sx={{ bgcolor: "error.main", height: 200 }} />
      <CardContent>
        <Typography variant="h6">{group.name}</Typography>
        <Typography variant="body2">
          {group.member_count} members · Due {dueDate}
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
