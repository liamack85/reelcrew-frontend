import { useAuth } from "../auth/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return <p>Loading...</p>;

  return (
    <section id="profile-header-bar">
      <p>🌮</p>
      <div>
        <p>{user.display_name}</p>
        <div id="profile-header-bar-user-info">
          <p>@{user.username}</p>
          <p>Member since 2024</p>
        </div>
        <p>chips</p>
      </div>
    </section>
  );
}

// id, username, display_name, email
// need recently watched and group summary
