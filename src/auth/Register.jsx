//
import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "./AuthContext";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onRegister = async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    const display_name = formData.get("display_name");
    const email = formData.get("email");
    try {
      await register({ username, password, display_name, email });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Register for an account</h1>
      <form action={onRegister}>
        <label>
          Username
          <input type="text" name="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <label>
          Display Name
          <input type="text" name="display_name" />
        </label>
        <label>
          email
          <input type="text" name="email" />
        </label>
        <button>Register</button>
        {error && <output>{error}</output>}
      </form>
      <Link to="/login">Already have an account? Log in here.</Link>
    </>
  );
}
