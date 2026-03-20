import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const API = import.meta.env.VITE_API;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    if (token) sessionStorage.setItem("token", token);
  }, [token]);

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

  const fetchMe = async (token) => {
    const response = await fetch(API + "/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) return;
    const result = await response.json();
    setUser(result);
  };

  const value = { token, user, register, login, logout };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw Error("useAuth must be used within an AuthProvider");
  return context;
}
