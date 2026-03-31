import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import {
  getDiscussionResponses,
  createDiscussionResponse,
  updateDiscussionResponse,
  deleteDiscussionResponse,
} from "../api/discussions";
import { formatDate } from "./MemberList";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

/**
 * Displays the discussion board for a watch event, including responses and a comment form.
 * Manages its own responses state internally.
 * @param {{ watch: Object }} props
 */
export default function WatchDiscussion({ watch }) {
  const { token, user } = useAuth();
  const [responses, setResponses] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingResponseId, setEditingResponseId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [responseError, setResponseError] = useState(null);

  const isCreator = user?.id === watch.group_creator_id;

  useEffect(() => {
    async function fetchResponses() {
      if (!watch?.id) return;
      try {
        const data = await getDiscussionResponses(watch.id);
        setResponses(data);
      } catch (e) {
        setResponseError(e.message);
      }
    }
    fetchResponses();
  }, [watch?.id]);

  async function handleCommentSubmit() {
    setResponseError(null);

    if (!newComment.trim()) {
      setResponseError("Comment cannot be empty.");
      return;
    }

    try {
      await createDiscussionResponse(token, watch.id, newComment);
      setNewComment("");
      const data = await getDiscussionResponses(watch.id);
      setResponses(data);
    } catch (e) {
      setResponseError(e.message);
    }
  }

  function handleEditResponseOpen(response) {
    setEditingResponseId(response.id);
    setEditContent(response.content);
  }

  async function handleEditResponseSubmit() {
    if (!editContent.trim()) return;

    try {
      await updateDiscussionResponse(token, editingResponseId, editContent);
      setEditingResponseId(null);
      setEditContent("");
      const data = await getDiscussionResponses(watch.id);
      setResponses(data);
    } catch (e) {
      setResponseError(e.message);
    }
  }

  async function handleDeleteResponse(responseId) {
    try {
      await deleteDiscussionResponse(token, responseId);
      const data = await getDiscussionResponses(watch.id);
      setResponses(data);
    } catch (e) {
      setResponseError(e.message);
    }
  }

  return (
    <Box sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5">Discussion</Typography>

      {responses.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No responses yet. Be the first to share your thoughts!
        </Typography>
      ) : (
        <Stack spacing={2}>
          {responses.map((response) => {
            const isAuthor = user?.id === response.user_id;
            const wasEdited = response.updated_at !== response.created_at;

            return (
              <Box key={response.id} sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
                    {response.display_name?.split(" ").map(w => w[0]).join("").toUpperCase()}
                  </Avatar>
                  <Typography variant="body2" fontWeight="bold">{response.display_name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(response.created_at)}
                    {wasEdited && " · edited"}
                  </Typography>
                  {isAuthor && (
                    <Button size="small" onClick={() => handleEditResponseOpen(response)}>Edit</Button>
                  )}
                  {(isAuthor || isCreator) && (
                    <Button size="small" color="error" onClick={() => handleDeleteResponse(response.id)}>
                      Delete
                    </Button>
                  )}
                </Stack>

                {editingResponseId === response.id ? (
                  <Stack spacing={1}>
                    <TextField
                      multiline
                      fullWidth
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      size="small"
                    />
                    <Stack direction="row" spacing={1}>
                      <Button variant="contained" size="small" onClick={handleEditResponseSubmit}>Save</Button>
                      <Button variant="outlined" size="small" onClick={() => setEditingResponseId(null)}>Cancel</Button>
                    </Stack>
                  </Stack>
                ) : (
                  <Typography variant="body1">{response.content}</Typography>
                )}

                <Divider />
              </Box>
            );
          })}
        </Stack>
      )}

      {responseError && <Typography color="error">{responseError}</Typography>}

      <Stack spacing={1}>
        <TextField
          multiline
          fullWidth
          placeholder="Share your thoughts..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          size="small"
        />
        <Button variant="contained" sx={{ width: "fit-content" }} onClick={handleCommentSubmit}>
          Comment
        </Button>
      </Stack>
    </Box>
  );
}