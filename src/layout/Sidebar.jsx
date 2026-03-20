import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header id="sidebar">
      <NavLink id="brand" to="/">
        <p>ReelCrew</p>
      </NavLink>
      <nav id="nav-menu">
        <NavLink to="/">Splash</NavLink>
        <NavLink to="/films">Films</NavLink>
        {user && <NavLink to={"/users/me"}>Profile</NavLink>}
        <NavLink to="/groups">Group</NavLink>
        {user ? (
          <div id="avatar-bar">
            <p id="avatar">🌮</p>
            <p>{user.display_name}</p>
            <button onClick={handleLogout}>Log out</button>
          </div>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
    </header>
  );
}
