/**
 * Displays a list of group members with their role, watch status, and avatar initials.
 *
 * @param {Object} props
 * @param {Array} props.members Array of member objects from the group watch progress data
 */

export default function MemberList({ members }) {
  if (!members) {
    return <p>There are no members. Add some!</p>;
  }

  return (
    <section id="member-list">
      <h2>Members</h2>
      <ul>
        {members.map((member) => (
          <li key={member.user_id} className="member-row">
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

/**
 * Extracts the first letter of each word in a name to create avatar initials.
 *
 * @param {string} name a user's display name
 * @returns {string} uppercase initials (e.g. "Big Terry" → "BT")
 */

export function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/**
 * Formats a date string into a short, readable format.
 *
 * @param {string} dateString - An ISO date string
 * @returns {string} Formatted date (e.g. "Mar 24")
 */

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
