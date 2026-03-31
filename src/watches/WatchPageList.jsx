import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { getWatchesByGroup } from "../api/groups";
import { formatDate } from "./MemberList";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


/**
 * Displays a list of all watch events for a specific group showing the film title, director, deadline, and status for each.
 */

export default function WatchPageList() {
  const { id } = useParams();
  const [watches, setWatches] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchWatches() {
      try {
        const data = await getWatchesByGroup(id);
        setWatches(data);
      } catch (e) {
        setError(e.message);
      }
    }
    fetchWatches();
  }, [id]);

  if (error) return <p className="error-message">{error}</p>;

  return (
    <section id="watch-page-list">
      <h2>Watch Events</h2>
      {watches.length === 0 ? (
        <p>No watches yet for this group</p>
      ) : (
      <Stack direction="row" spacing={1}>
        {watches.map((watch) => (
          <Card key={watch.id} sx={{maxWidth: 320}}>
            <CardActionArea onClick={()=>navigate("/watch-group/" + watch.id)}>
            <CardContent>

                <Typography variant="h5" component="div">{watch.title}</Typography>
                <Typography variant="body2">
                  {watch.year} · {watch.director}
                </Typography>
                <p>Deadline: {formatDate(watch.deadline)}</p>
                <p>Status: <Chip label={watch.status} color={watch.status === "complete" ? "success":""} size="small"/></p>

            </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
      )}
    </section>
  );
}
