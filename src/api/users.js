const API = import.meta.env.VITE_API;

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
