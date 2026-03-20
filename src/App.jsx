import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProfilePage from "./profile/ProfilePage";
import SplashPage from "./layout/SplashPage";
import FilmsPage from "./films/FilmsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<SplashPage />} />
        <Route path="/films" element={<FilmsPage />} />
        <Route path="/users/me" element={<ProfilePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
