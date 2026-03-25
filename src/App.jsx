import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProfilePage from "./profile/ProfilePage";
import SplashPage from "./splashPage/SplashPage";
import FilmsPage from "./films/FilmsPage";
import GroupsPage from "./groups/GroupsPage";
import WatchPage from "./watches/WatchGroupDetail";
import FilmDetail from "./films/FilmDetail";
import WatchForm from "./watches/WatchPageForm";
import GroupDetails from "./groups/GroupDetails";
import WatchPageList from "./watches/WatchPageList";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<SplashPage />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/groups/:id" element={<GroupDetails />} />
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/watch-group/:id" element={<WatchPage />} />
        <Route path="/watch-group/:id/assign" element={<WatchForm />} />
        <Route path="/watch-group/:id/watches" element={<WatchPageList />} />
        <Route path="/films/:id" element={<FilmDetail />} />
        <Route path="/users/me" element={<ProfilePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
