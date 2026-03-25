import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { getWatchesByGroup } from "../api/groups";

/**
 * Displays a list of all watch events for a specific group showing the film title, director, deadline, and status for each.
 */

export default function WatchPageList() {
  const { id } = useParams();
  const [watches, setWatches] = useState([]);
  const [error, setError] = useState(null);

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
      <h1>Watch Events</h1>
      {watches.length === 0 ? (
        <p>No watches yet for this group</p>
      ) : (
        <ul>
          {watches.map((watch) => (
            <li key={watch.id}>
              <Link to={"/watch-group/" + watch.group_id}>
                <h2>{watch.title}</h2>
                <p>
                  {watch.year} · {watch.director}
                </p>
                <p>Deadline: {watch.deadline}</p>
                <p>Status: {watch.status}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
