import { useAuth } from "../auth/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return <p>Loading...</p>;

  return (
    <section>
      <h1>{user.display_name}</h1>
      <p>@{user.username}</p>
      <p>recently watched</p>
      <p>watch groups</p>
    </section>
  );
}

// id, username, display_name, email
