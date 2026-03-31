import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { getCurrentWatch } from "../api/watches";
import { getFilms } from "../api/films";
import {
  getDiscussionResponses,
  createDiscussionResponse,
  updateDiscussionResponse,
  deleteDiscussionResponse,
} from "../api/discussions";
import MemberList, { formatDate } from "./MemberList";

const API = import.meta.env.VITE_API;

/**
 * Displays the detail page for a group's current watch event, including the film info,
 * deadline countdown, group progress bar, member list, and discussion board.
 */

export default function WatchPage() {
  const { id } = useParams();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [watch, setWatch] = useState(null);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [deadline, setDeadline] = useState("");
  const [discussionPrompt, setDiscussionPrompt] = useState("");
  const [editError, setEditError] = useState(null);

    // Delete state
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [responses, setResponses] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingResponseId, setEditingResponseId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [responseError, setResponseError] = useState(null);

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

  if (error) return <p>{error}</p>;
  if (!watch) return <p>No film assigned yet.</p>;

  const today = new Date();
  const deadlineDate = new Date(watch.deadline);
  const daysLeft = Math.max(0, Math.round((deadlineDate - today) / 86400000));

  const isCreator = user?.id === watch.group_creator_id;

  function handleWatchGroupEdit() {
    setSelectedFilm({ id: watch.film_id, title: watch.title });
    setDeadline(watch.deadline?.slice(0, 10) ?? "");
    setDiscussionPrompt(watch.discussion_prompt ?? "");
    setQuery("");
    setSearchResults([]);
    setEditError(null);
    setIsEditing(true);
  }

  async function handleFilmSearch() {
    try {
      const films = await getFilms(query);
      setSearchResults(films);
    } catch (e) {
      setEditError(e.message);
    }
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
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

  async function handleDelete() {
    try {
      const res = await fetch(API + "/group-watches/" + watch.id, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(await res.text());

      navigate("/watch-group/" + id);
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleCommentSubmit(e) {
    e.preventDefault();
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

  async function handleEditResponseSubmit(e) {
    e.preventDefault();

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
    <div id="watch-page">
      <section id="watch-header">
        <h1>{watch.group_name}</h1>
        <p>{watch.progress?.total} members · Watch group</p>
      </section>

      <section id="now-watching">
        <h2>Now watching</h2>

        {isCreator && !isEditing && (
          <div className="host-actions">
            <button onClick={handleWatchGroupEdit}>Edit</button>
            <button onClick={() => setConfirmDelete(true)}>Delete</button>
          </div>
        )}

        {confirmDelete && (
          <div className="confirm-delete">
            <p>Are you sure you want to remove <strong>{watch.title}</strong>? This cannot be undone.</p>
            <button onClick={handleDelete}>Yes, delete</button>
            <button onClick={() => setConfirmDelete(false)}>Cancel</button>
          </div>
        )}

        {isEditing ? (
          <div id="edit-watch-form">
            <div id="film-search">
              <input
                type="text"
                placeholder="Search for a film..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="button" onClick={handleFilmSearch}>Search</button>
            </div>

            {searchResults.length > 0 && (
              <ul id="film-search-results">
                {searchResults.map((film) => (
                  <li
                    key={film.id}
                    className={selectedFilm?.id === film.id ? "selected" : ""}
                    onClick={() => setSelectedFilm(film)}
                  >
                    <p>{film.title}</p>
                    <p>{film.year} · {film.director}</p>
                  </li>
                ))}
              </ul>
            )}

            {selectedFilm && (
              <p id="selected-film">Selected: {selectedFilm.title}</p>
            )}

            <form onSubmit={handleEditSubmit}>
              <label>
                Deadline
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </label>

              <label>
                Discussion prompt (optional)
                <input
                  type="text"
                  placeholder="What should the group discuss?"
                  value={discussionPrompt}
                  onChange={(e) => setDiscussionPrompt(e.target.value)}
                />
              </label>

              {editError && <p className="error-message">{editError}</p>}

              <button type="submit">Save changes</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          </div>
        ) : (
          <div className="film-feature">
            <img src={watch.poster_url} alt={watch.title} />
            <div className="film-feature-info">
              <h3>{watch.title}</h3>
              <p>{watch.year} · {watch.director} · {watch.runtime}</p>
              <p>{watch.genre}</p>
              <p>{watch.description}</p>
            </div>
          </div>
        )}
      </section>

      <section id="watch-deadline">
        <h2>Watch deadline</h2>
        <p>{formatDate(watch.deadline)}</p>
        <p>{daysLeft} days left</p>
      </section>

      <section id="watch-progress">
        <p>
          Group progress: {watch.progress?.watched} of {watch.progress?.total} watched
          — {watch.progress?.percent}%
        </p>
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: watch.progress?.percent + "%" }}
          />
        </div>
      </section>

      {watch.discussion_prompt && (
        <section id="discussion-prompt">
          <h2>Discussion prompt</h2>
          <p>{watch.discussion_prompt}</p>
        </section>
      )}

      <section id="discussion-board">
        <h2>Discussion</h2>
        {responses.length === 0 ? (
          <p>No responses yet. Be the first to share your thoughts!</p>
        ) : (
          <ul id="response-list">
            {responses.map((response) => {
              const isAuthor = user?.id === response.user_id;
              const wasEdited = response.updated_at !== response.created_at;

              return (
                <li key={response.id} className="response-item">
                  <div className="response-header">
                    <div className="response-avatar">
                      {response.display_name?.split(" ").map(w => w[0]).join("").toUpperCase()}
                    </div>
                    <div className="response-meta">
                      <span className="response-author">{response.display_name}</span>
                      <span className="response-date">
                        {formatDate(response.created_at)}
                        {wasEdited && <span className="response-edited"> · edited</span>}
                      </span>
                    </div>

                    {isAuthor && (
                      <button
                        className="response-action"
                        onClick={() => handleEditResponseOpen(response)}
                      >
                        Edit
                      </button>
                    )}

                    {(isAuthor || isCreator) && (
                      <button
                        className="response-action"
                        onClick={() => handleDeleteResponse(response.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  {editingResponseId === response.id ? (
                    <form onSubmit={handleEditResponseSubmit}>
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                      />
                      <button type="submit">Save</button>
                      <button type="button" onClick={() => setEditingResponseId(null)}>Cancel</button>
                    </form>
                  ) : (
                    <p className="response-content">{response.content}</p>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {responseError && <p className="error-message">{responseError}</p>}
        <form id="new-comment-form" onSubmit={handleCommentSubmit}>
          <textarea
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">Comment</button>
        </form>
      </section>

      <MemberList members={watch.progress?.members} />
    </div>
  );
}