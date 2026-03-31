import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { getCurrentWatch } from "../api/watches";
import { getFilms } from "../api/films";
import MemberList, { formatDate } from "./MemberList";

const API = import.meta.env.VITE_API;

/**
 * Displays the detail page for a group's current watch event, including the film info, deadline countdown, group progress bar, and member list.
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

      <MemberList members={watch.progress?.members} />
    </div>
  );
}
