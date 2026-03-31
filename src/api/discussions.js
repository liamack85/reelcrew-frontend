const API = import.meta.env.VITE_API;

export async function getDiscussionResponses(groupWatchId) {
  const response = await fetch(API + "/discussion-responses/group-watch/" + groupWatchId);
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}

export async function createDiscussionResponse(token, groupWatchId, content) {
  const response = await fetch(API + "/discussion-responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ group_watch_id: groupWatchId, content }),
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}

export async function updateDiscussionResponse(token, id, content) {
  const response = await fetch(API + "/discussion-responses/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ content }),
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}

export async function deleteDiscussionResponse(token, id) {
  const response = await fetch(API + "/discussion-responses/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearr " + token },
  });
  if (!response.ok) {
    const result = await response.text();
    throw Error(result);
  }
}