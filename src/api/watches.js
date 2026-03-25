const API = import.meta.env.VITE_API;

/**
 * Fetches the current active watch event for a group
 *
 * @param {number} groupId the watch group ID
 * @returns {Object} the current watch event with film and progress data
 */

export async function getCurrentWatch(groupId) {
  const response = await fetch(API + "/group-watches/group/" + groupId + "/current");
  const result = await response.json();
  return result;
}

/**
 * Assigns a film to a watch group as a new watch event
 *
 * @param {string} token the bearer token for authentication
 * @param {number} groupId the watch group ID
 * @param {number} filmId the film ID to assign
 * @returns {Object} the newly created watch event
 */

export async function assignWatch(token, groupId, filmId) {
  try {
    const response = await fetch(API+"/groups/"+groupId+"/watches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ groupId, filmId }),
    });
    const result = await response.json();
    if (!token) throw Error(result.message);
    return result;
  } catch (e) {
    console.log('CANNOT ASSIGN: ', e);
  }
}

/**
 * Marks the current user as having watched the group's current film
 *
 * @param {string} token the bearer token for authentication
 * @param {number} groupId the watch group ID
 * @returns {Object} the updated watch progress
 */

export async function markWatched(token, groupId) {
  try {
    const response = await fetch(API+"/groups/"+groupId+"/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ groupId }),
    });
    const result = await response.json();
    if (!response.ok) throw Error(result.message);
    return result;
  } catch (e) {
    console.log('CANNOT CAST VOTES: ', e);
  }
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
    const response = await fetch(API+"/groups/"+groupId+"/votes", {
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
    console.log('CANNOT CAST VOTES: ', e);
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
    const response = await fetch(API+"/groups/"+groupId+"/votes");
    const result = await response.json();
    return result;    
  } catch (e) {
    console.log('CANNOT GET VOTES: ', e);
  }
}