import { NavLink } from "react-router";

import { useAuth } from "../auth/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  return (
    <header id="sidebar">
      <NavLink id="brand" to="/">
        <p>ReelCrew</p>
      </NavLink>
      <nav>
        <NavLink to="/">Splash</NavLink>
        <NavLink to="/films">Movies</NavLink>
        <NavLink to="/groups">Group</NavLink>
        {user && <NavLink to={"/users/me"}>Profile</NavLink>}
        {user ? (
          <div>
            <p>{user.display_name}</p>
            <button onClick={logout}>Log out</button>
          </div>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
    </header>
  );
}
