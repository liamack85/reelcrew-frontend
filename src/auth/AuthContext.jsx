import { createContext, useContext, useEffect, useState } from "react";

const API = import.meta.env.VITE_API;

const AuthContext = createContext();

/**
 * @typedef {Object} AuthContext
 * @property {object|null} user
 * @property {string|null} token
 * @property {(credentials: object) => Promise<void>} login
 * @property {(credentials: object) => Promise<void>} register
 * @property {() => void} logout
 * @property {boolean} modalOpen
 * @property {() => void} openAuthModal
 * @property {() => void} closeAuthModal
 *
 * @returns {AuthContext}
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  // Auth modal state lives here so any component can open it without prop drilling
  const [modalOpen, setModalOpen] = useState(false);
  const openAuthModal = () => setModalOpen(true);
  const closeAuthModal = () => setModalOpen(false);

  // Persists token to sessionStorage when it changes
  useEffect(() => {
    if (token) sessionStorage.setItem("token", token);
  }, [token]);

  // Rehydrates user from an existing token on page load
  useEffect(() => {
    if (token) fetchMe(token);
  }, [token]);

  const register = async (credentials) => {
    const response = await fetch(API + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw Error(await response.text());
    const result = await response.json();
    setToken(result.token);
    fetchMe(result.token);
  };

  const login = async (credentials) => {
    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw Error(await response.text());
    const result = await response.json();
    setToken(result.token);
    fetchMe(result.token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem("token");
  };

  // Fetches the full user object after auth - called on login, register, and token rehydration
  const fetchMe = async (token) => {
    const response = await fetch(API + "/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) return;
    const result = await response.json();
    setUser(result);
  };

  const value = {
    token,
    user,
    register,
    login,
    logout,
    modalOpen,
    openAuthModal,
    closeAuthModal,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
