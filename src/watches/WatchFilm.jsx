import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { formatDate } from "./MemberList";
import { markWatched } from "../api/watches";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const API = import.meta.env.VITE_API;

/**
 * Displays the film details, deadline, group progress, discussion prompt,
 * and host edit/delete controls for a watch event.
 * @param {{ watch: Object, onEditClick: Function }} props
 */
export default function WatchFilmInfo({ watch, onEditClick, onWatched }) {
  const { id } = useParams();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState(null);

  const isCreator = user?.id === watch.group_creator_id;

  const currentMember = watch.progress?.members?.find((m) => m.user_id === user?.id);
  const [hasWatched, setHasWatched] = useState(currentMember?.status === "watched");

  async function handleMarkWatched() {
    console.debug("handleMarkWatched fired", watch.id, token);
    const newStatus = hasWatched ? "pending" : "watched";
    try {
      await markWatched(token, watch.id, newStatus);
      setHasWatched(!hasWatched);
      onWatched?.();
    } catch (e) {
      setError(e.message);
    }
  }

  const today = new Date();
  const deadlineDate = new Date(watch.deadline);
  const daysLeft = Math.max(0, Math.round((deadlineDate - today) / 86400000));

  async function handleDelete() {
    try {
      const res = await fetch(API + "/group-watches/" + watch.id, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(await res.text());

      navigate("/groups/" + watch.group_id)
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      <Typography variant="h4">{watch.title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {watch.year} · {watch.director} · {watch.runtime}
      </Typography>
      {watch.genre && <Chip label={watch.genre} size="small" sx={{ width: "fit-content" }} />}
      {user && (
      <Chip
        label={hasWatched ? "Watched" : "Mark as watched"}
        color={hasWatched ? "success" : "default"}
        size="small"
        onClick={handleMarkWatched}
        sx={{ width: "fit-content", cursor: "pointer" }}
      />
    )}

      <Typography variant="body1">{watch.description}</Typography>

      <Divider />

      <Typography variant="body2">Deadline: {formatDate(watch.deadline)}</Typography>
      <Typography variant="body2">{daysLeft} days left</Typography>

      <Stack direction="row" alignItems="center" spacing={1}>
        <LinearProgress
          variant="determinate"
          value={watch.progress?.percent ?? 0}
          sx={{ flexGrow: 1 }}
        />
        <Typography variant="body2">
          Group Progress: {watch.progress?.percent ?? 0}% watched
        </Typography>
      </Stack>

      {watch.discussion_prompt && (
        <>
          <Divider />
          <Typography variant="body2" color="text.secondary">Discussion prompt</Typography>
          <Typography variant="body1">{watch.discussion_prompt}</Typography>
        </>
      )}

      {isCreator && (
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Button variant="outlined" size="small" onClick={onEditClick}>Edit</Button>
          <Button variant="outlined" size="small" color="error" onClick={() => setConfirmDelete(true)}>
            Delete
          </Button>
        </Stack>
      )}

      {confirmDelete && (
        <Box>
          <Typography>
            Are you sure you want to delete this watch event? This cannot be undone.
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Button variant="contained" color="error" size="small" onClick={handleDelete}>
              Yes, delete
            </Button>
            <Button variant="outlined" size="small" onClick={() => setConfirmDelete(false)}>
              Cancel
            </Button>
          </Stack>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      )}
    </>
  );
}