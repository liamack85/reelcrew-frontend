import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { assignWatch } from "../api/watches";
import { getFilms } from "../api/films";

/**
 * Form for assigning a film to a watch group. Lets the host search for a film select it, set a deadline, and optionally add a discussion prompt.
 */

export default function WatchForm() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

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
      navigate("/watch-group/" + id);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section id="watch-form">
      <h1>Assign a film</h1>

      <div id="film-search">
        <input
          type="text"
          placeholder="Search for a film..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>Search</button>
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

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Assign to group</button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </section>
  );
}