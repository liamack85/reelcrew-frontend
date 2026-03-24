import { Outlet } from "react-router";

import Sidebar from "./Sidebar";
import AuthModal from "../auth/AuthModal";

export default function Layout() {
  return (
    <>
      <Sidebar />
      <AuthModal />
      <main>
        <Outlet />
      </main>
    </>
  );
}
