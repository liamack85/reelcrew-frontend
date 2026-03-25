const API = import.meta.env.VITE_API;

// Public endpoints — server derives data from userId in the URL
export async function getUserWatched(id) {
  try {
    const response = await fetch(API + "/users/" + id + "/watched");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getUserGroups(id) {
  try {
    const response = await fetch(API + "/users/" + id + "/groups");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

// Protected endpoint — server derives user from JWT, no id needed in URL
export async function getAllUserFilms(token) {
  try {
    const response = await fetch(API + "/user-films", {
      headers: { Authorization: "Bearer " + token },
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}
