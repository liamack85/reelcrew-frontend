const API = import.meta.env.VITE_API;

/**
 * Fetches the current active watch event for a group
 *
 * @param {number} groupId the watch group ID
 * @returns {Object} the current watch event with film and progress data
 */
export async function getCurrentWatch(watchId) {
  const response = await fetch(
    API + "/group-watches/" + watchId,
  );
  const result = await response.json();
  return result;
}

/**
 * Assigns a film to a watch group as a new watch event.
 * Status is hardcoded to "watching" on creation.
 * Throws on error — caller is responsible for handling.
 *
 * @param {string} token - Bearer token for authentication
 * @param {number} groupId - The watch group ID
 * @param {number} filmId - The film ID to assign
 * @param {string} deadline - ISO date string for the watch deadline
 * @param {string} [discussionPrompt] - Optional discussion prompt for the group
 * @returns {Promise<Object>} The newly created group watch entry
 */
export async function assignWatch(
  token,
  groupId,
  filmId,
  deadline,
  discussionPrompt,
) {
  const response = await fetch(API + "/group-watches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      group_id: groupId,
      film_id: filmId,
      deadline: deadline,
      status: "watching",
      ...(discussionPrompt && { discussion_prompt: discussionPrompt }),
    }),
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}

/**
 * Marks the current user as having watched a specific watch event.
 *
 * @param {string} token - Bearer token for authentication
 * @param {number} watchId - The watch event ID
 * @returns {Promise<Object>} The updated progress row
 */
export async function markWatched(token, watchId, status) {
  console.debug("markWatched hitting", API + "/group-watches/" + watchId + "/progress");
  const response = await fetch(API + "/group-watches/" + watchId + "/progress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ status }),
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}

/**
 * Casts a vote for which film the group should watch next (this is a stretch goal, not yet implemented)
 *
 * @param {string} token the bearer token for authentication
 * @param {number} groupId the watch group ID
 * @param {number} filmId the film ID to vote for
 * @returns {Object} the created vote record
 */
export async function castVote(token, groupId, filmId) {
  try {
    const response = await fetch(API + "/groups/" + groupId + "/votes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ groupId, filmId }),
    });
    const result = await response.json();
    if (!response.ok) throw Error(result.message);
    return result;
  } catch (e) {
    console.log("CANNOT CAST VOTES: ", e);
  }
}

/**
 * Fetches all votes for a group's next film (this is a stretch goal, not yet implemented)
 *
 * @param {number} groupId the watch group ID
 * @returns {Array} list of votes for the group
 */
export async function getVotes(groupId) {
  try {
    const response = await fetch(API + "/groups/" + groupId + "/votes");
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("CANNOT GET VOTES: ", e);
  }
}
