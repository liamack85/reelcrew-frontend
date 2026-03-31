import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { getCurrentWatch } from "../api/watches";
import { getFilms } from "../api/films";
import MemberList from "./MemberList";
import WatchHeader from "./WatchHeader";
import WatchFilmInfo from "./WatchFilm";
import WatchDiscussion from "./WatchDiscussion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const API = import.meta.env.VITE_API;

/**
 * Displays the detail page for a group's current watch event.
 * Manages watch data fetching and the edit form.
 */
export default function WatchPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [watch, setWatch] = useState(null);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [deadline, setDeadline] = useState("");
  const [discussionPrompt, setDiscussionPrompt] = useState("");
  const [editError, setEditError] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const watchData = await getCurrentWatch(id);
        setWatch(watchData);
      } catch (e) {
        setError(e.message);
      }
    }
    fetchData();
  }, [id, token]);

  if (error) return <p>{error}</p>;
  if (!watch) return <p>No film assigned yet.</p>;

  function handleEditClick() {
    setSelectedFilm({ id: watch.film_id, title: watch.title });
    setDeadline(watch.deadline?.slice(0, 10) ?? "");
    setDiscussionPrompt(watch.discussion_prompt ?? "");
    setQuery("");
    setSearchResults([]);
    setEditError(null);
    setIsEditing(true);
    setStatus(watch.status ?? "watching");
  }

  async function handleFilmSearch() {
    try {
      const films = await getFilms(query);
      setSearchResults(films);
    } catch (e) {
      setEditError(e.message);
    }
  }

  async function handleEditSubmit() {
    setEditError(null);

    if (!selectedFilm) {
      setEditError("Please select a film.");
      return;
    }

    if (!deadline) {
      setEditError("Please set a deadline.");
      return;
    }

    try {
      const res = await fetch(API + "/group-watches/" + watch.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          film_id: selectedFilm.id,
          deadline,
          discussion_prompt: discussionPrompt,
          status, 
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      const updatedWatch = await getCurrentWatch(id);
      setWatch(updatedWatch);
      setIsEditing(false);
    } catch (e) {
      setEditError(e.message);
    }
  }

  return (
    <div id="watch-page">
      <WatchHeader watch={watch} />

      <Box sx={{ display: "flex", gap: 4, padding: 3, flexDirection: { xs: "column", sm: "row" } }}>
        <Box
          component="img"
          src={watch.poster_url}
          alt={watch.title}
          sx={{ width: { xs: "100%", sm: 250 }, borderRadius: 2, objectFit: "cover", flexShrink: 0 }}
        />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {isEditing ? (
            <Stack spacing={2}>
              <Typography variant="h5">Edit watch event</Typography>

              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  placeholder="Search for a film..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  size="small"
                  fullWidth
                />
                <Button variant="outlined" onClick={handleFilmSearch}>Search</Button>
              </Box>

              {searchResults.length > 0 && (
                <Stack spacing={1}>
                  {searchResults.map((film) => (
                    <Box
                      key={film.id}
                      onClick={() => setSelectedFilm(film)}
                      sx={{
                        padding: 1,
                        borderRadius: 1,
                        cursor: "pointer",
                        backgroundColor: selectedFilm?.id === film.id ? "action.selected" : "background.paper",
                        "&:hover": { backgroundColor: "action.hover" },
                      }}
                    >
                      <Typography variant="body1">{film.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {film.year} · {film.director}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              )}

              {selectedFilm && (
                <Typography variant="body2" color="primary">Selected: {selectedFilm.title}</Typography>
              )}

              <TextField
                label="Deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="watching">Watching</MenuItem>
                  <MenuItem value="complete">Complete</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Discussion prompt (optional)"
                placeholder="What should the group discuss?"
                value={discussionPrompt}
                onChange={(e) => setDiscussionPrompt(e.target.value)}
                fullWidth
              />

              {editError && <Typography color="error">{editError}</Typography>}

              <Stack direction="row" spacing={1}>
                <Button variant="contained" onClick={handleEditSubmit}>Save changes</Button>
                <Button variant="outlined" onClick={() => setIsEditing(false)}>Cancel</Button>
              </Stack>
            </Stack>
          ) : (
            <WatchFilmInfo watch={watch} onEditClick={handleEditClick} />
          )}
        </Box>
      </Box>

      <Divider />

      <WatchDiscussion watch={watch} />

      <MemberList members={watch.progress?.members} />
    </div>
  );
}
