const API = import.meta.env.VITE_API;

export async function getFilms() {
  try {
    const response = await fetch(API + "/films");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

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
