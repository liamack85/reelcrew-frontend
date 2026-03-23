import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { getCurrentWatch } from "../api/watches";
import MemberList from "./MemberList";

export default function WatchPage() {
  const { id } = useParams();
  const { token, user } = useAuth();
  const [watch, setWatch] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const watchData = await getCurrentWatch(token, id);
        setWatch(watchData);
      } catch (e) {
        setError(e.message);
      }
    }
    fetchData();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!watch) return <p>No film assigned yet.</p>;

  const today = new Date();
  const deadline = new Date(watch.deadline);
  const daysLeft = Math.round((deadline - today) / 86400000);

  return (
    <div id="watch-page">
      <section id="watch-header">
        <h1>{watch.group_name}</h1>
        <p>{watch.progress?.total} members · Watch group</p>
      </section>

      <section id="now-watching">
        <h2>Now watching</h2>
        <div className="film-feature">
          <img src={watch.film?.poster_url} alt={watch.film?.title} />
          <div className="film-feature-info">
            <h3>{watch.film?.title}</h3>
            <p>{watch.film?.year} · {watch.film?.director} · {watch.film?.runtime}</p>
            <p>{watch.film?.genre}</p>
            <p>{watch.film?.description}</p>
          </div>
        </div>
      </section>

      <section id="watch-deadline">
        <h2>Watch deadline</h2>
        <p>{watch.deadline}</p>
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
