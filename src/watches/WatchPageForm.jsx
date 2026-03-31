import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { assignWatch } from "../api/watches";
import { getFilms } from "../api/films";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

/**
 * Form for assigning a film to a watch group. Lets the host search for a film select it, set a deadline, and optionally add a discussion prompt.
 */

export default function WatchForm({ onSuccess }) {
  const { id } = useParams();
  const { token } = useAuth();

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [deadline, setDeadline] = useState("");
  const [discussionPrompt, setDiscussionPrompt] = useState("");
  const [error, setError] = useState(null);

  /** Searches for films via the OMDb API and updates the results list */

  const handleSearch = async () => {
    try {
      const films = await getFilms(query);
      setSearchResults(films);
    } catch (e) {
      setError(e.message);
    }
  };

/** Validates the form and assigns the selected film to the group */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!selectedFilm) {
      setError("Please select a film.");
      return;
    }

    if (!deadline) {
      setError("Please set a deadline.");
      return;
    }

    try {
      await assignWatch(token, id, selectedFilm.id, deadline, discussionPrompt);
      onSuccess?.();
    } catch (e) {
      setError(e.message);
    }
  };

return (
  <>
    <DialogTitle>Assign a film</DialogTitle>
    <DialogContent>
      <Stack spacing={2}>

        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            placeholder="Search for a film..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="small"
            fullWidth
          />
          <Button variant="outlined" onClick={handleSearch}>Search</Button>
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
                  "&:hover": { backgroundColor: "action.hover" }
                }}
              >
                <Typography variant="body1">{film.title}</Typography>
                <Typography variant="body2" color="text.secondary">{film.year} · {film.director}</Typography>
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
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <TextField
          label="Discussion prompt (optional)"
          placeholder="What should the group discuss?"
          value={discussionPrompt}
          onChange={(e) => setDiscussionPrompt(e.target.value)}
          fullWidth
        />

        {error && <Typography color="error">{error}</Typography>}

        <Button variant="contained" onClick={handleSubmit}>
          Assign to group
        </Button>

      </Stack>
    </DialogContent>
  </>
);
}