export default function MemberList({ members }) {
  if (!members) {
    return <p>There are no members. Add some!</p>;
  }

  return (
    <section id="member-list">
      <h2>Members</h2>
      <ul>
        {members.map((member) => (
          <li key={member.userid} className="member-row">
            <div className="member-avatar">
              {getInitials(member.display_name)}
            </div>

            <div className="member-info">
              <p>{member.display_name}</p>
              <p className="member-details">
                {member.role === "host" ? "Host" : "Member"}
                {member.status === "watched" && member.watched_at
                  ? " · Watched " + formatDate(member.watched_at)
                  : " · Added to watchlist"}
              </p>
            </div>

            <p
              className={
                member.status === "watched" ? "badge-watched" : "badge-pending"
              }>
              {member.status === "watched" ? "Watched" : "Pending"}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString({ month: "short", day: "numeric" });
}
