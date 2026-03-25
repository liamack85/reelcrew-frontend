const API = import.meta.env.VITE_API;

/**
 * Logs in a user with their credentials
 * 
 * @param {Object} credentials Object contains username and password
 * @returns {Object} the user data and token from the server
 * @throws {Error} when login fails an error is thrown
 */

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

/**
 * Registers a new user account
 * 
 * @param {Object} credentials Object containing username, email, password, and display name
 * @returns {Object} the newly created user data and token
 * @throws {Error} when registration fails an error is thrown
 */

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

/**
 * Fetches the currently logged-in user's profile
 * 
 * @param {string} token the bearer token for authentication
 * @returns {Object|null} the user object, or null if not authenticated
 */

export async function getUser(token) {
  const response = await fetch(API + "/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) return null;
  return response.json();
}

/**
 * Updates a user's profile info
 * 
 * @param {string} token the bearer token for authentication
 * @param {number} id the user's ID 
 * @param {Object} updates Object containing the fields to update 
 * @returns {Object} the updated user data
 * @throws {Error} when the update fails an error is thrown
 */

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
