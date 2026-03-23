import { Route, Routes } from "react-router";
import { useAuth } from "./auth/AuthContext";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProfilePage from "./profile/ProfilePage";
import SplashPage from "./splashPage/SplashPage";
import FilmsPage from "./films/FilmsPage";
import GroupsPage from "./groups/GroupsPage";
import WatchPage from "./watches/WatchPage";
import FilmDetail from "./films/FilmDetail";

export default function App() {
  const { token } = useAuth();
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<SplashPage />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/watch-group/:id" element={<WatchPage />} />
        <Route path="/films/:id" element={<FilmDetail token={token} />} />
        <Route path="/users/me" element={<ProfilePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
