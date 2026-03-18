import { NavLink } from "react-router";

import { useAuth } from "../auth/AuthContext";

export default function Sidebar() {
  const { token, logout } = useAuth();
  return (
    <header id="sidebar">
      <NavLink id="brand" to="/">
        <p>Frontend Template</p>
      </NavLink>
      <nav>
        {token ? (
          <button onClick={logout}>Log out</button>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
    </header>
  );
}
