const API = import.meta.env.VITE_API;

export async function loginUser(credentials) {
  const response = await fetch(API + "/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const result = await response.json();
  if (response.ok) {
    return result;
  } else {
    throw new Error(result.error || "Login failed");
  }
}

export async function registerUser(credentials) {
  const response = await fetch(API + "/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const result = await response.json();
  if (response.ok) {
    return result;
  } else {
    throw new Error(result.error || "Registration failed");
  }
}

export async function getUser(token) {
  const response = await fetch(API + "/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) return null;
  return response.json();
}

export async function updateUser(token, id, updates) {
  const response = await fetch(API + "/users/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  const result = await response.json();
  if (response.ok) {
    return result;
  } else {
    throw new Error(result.error || "Update failed");
  }
}
