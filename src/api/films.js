const API = import.meta.env.VITE_API;

/* Fetches a list of films that can be filtered by
a search query that is safe for URL. */
export async function getFilms(query = "") {
  try {
    const url = query
      ? `${API}/films?q=${encodeURIComponent(query)}`
      : `${API}/films`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/* Fetches detailed film information for a single film by id */
export async function getFilmById(id) {
  try {
    const response = await fetch(API + "/films/" + id);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/* Adds a film to an authenticated user's watchlist. */
export async function addToWatchlist(token, filmId) {
  const response = await fetch(API + "/user-films", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ filmId }),
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}

/* Removes a film from an authenticated user's watchlist. */
export async function removeFromWatchlist(token, userFilmId) {
  const response = await fetch(API + "/user-films/" + userFilmId, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });
  if (!response.ok) {
    const result = await response.text();
    throw Error(result);
  }
}
