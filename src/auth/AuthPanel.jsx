import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";

import { useState } from "react";
import { useAuth } from "./AuthContext";

/** Combined login/register form rendered inside the auth modal. Toggles between modes via a ToggleButtonGroup. */
export default function AuthPanel() {
  const { login, register, closeAuthModal } = useAuth();
  const [mode, setMode] = useState("login");
  const [error, setError] = useState(null);

  // Handles both login and register - mode state determines which auth call to make
  const onSubmit = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      if (mode === "login") {
        await login({ username, password });
      } else {
        // Register requires additional fields
        const display_name = formData.get("display_name");
        const email = formData.get("email");
        await register({ username, password, display_name, email });
      }
      // Close modal on success - error case falls through to catch without closing
      closeAuthModal();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(e, newMode) => setMode(newMode)}>
        <ToggleButton value="login">Log In</ToggleButton>
        <ToggleButton value="register">Register</ToggleButton>
      </ToggleButtonGroup>

      <form action={onSubmit}>
        <TextField name="username" label="Username" />
        <TextField name="password" label="Password" type="password" />

        {mode === "register" && (
          <>
            <TextField name="display_name" label="Display Name" />
            <TextField name="email" label="Email" />
          </>
        )}

        <Button type="submit">{mode}</Button>
        {error && <Typography color="error">{error}</Typography>}
      </form>
    </Box>
  );
}
