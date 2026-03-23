import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <CssBaseline enableColorScheme>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </CssBaseline>,
);
