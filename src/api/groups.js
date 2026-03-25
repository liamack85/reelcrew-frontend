const API = import.meta.env.VITE_API;

/**
 * Fetch all watch groups
 *
 * @returns {Array} list of all watch groups with member counts
 */

export async function getGroups() {
  try {
    const response = await fetch(API+"/watch-groups");
    const result = await response.json();
    return result;
  } catch (e) {
    console.log('CANNOT GET GROUPS: ', e);
  }
}

/**
 * Fetches a single watch group by its ID
 *
 * @param {number} id the watch group ID
 * @returns {Object} the watch group data
 */

export async function getGroupById(id) {
  try {
    const response = await fetch(API+"/watch-groups/"+id);
    const result = await response.json();
    return result;
  } catch (e) {
    console.log('CANNOT GET GROUP BY ID: ', e);
  }
}

/**
 * Fetch watch groups that a specific user belongs to
 *
 * @param {number} userId the user's ID
 * @returns {Array} list of watch groups for that user
 */
export async function getGroupByUserId(userId) {
  try {
    const response = await fetch(API+"/watch-groups/"+userId);
    const result = await response.json();
    return result;
  } catch (e) {
    console.log('CANNOT GET GROUP BY USER ID: ', e);
  }
}

/**
 * Creates a new watch group
 *
 * @param {string} token the bearer token for authentication
 * @param {string} name name of the new group
 * @param {number} creator_id ID of the user creating the group
 * @returns {Object} the newly created watch group
 * @throws {Error} when the request fails
 */

export async function createGroup(token, name, creator_id) {
  const response = await fetch(API + "/watch-groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ name, creator_id }),
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.message || "Request failed");
  return result;
}

/**
 * Adds the current user to a watch group
 *
 * @param {string} token the bearer token for authentication
 * @param {number} id ID of the group to join
 * @returns {Object} the updated group membership data
 * @throws {Error} when the request fails
 */

export async function joinGroup(token, id) {
  const response = await fetch(API + "/watch-groups", {
    method: "UPDATE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ id }),
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}

/**
 * Removes the current user from a watch group
 *
 * @param {string} token the bearer token for authentication
 * @param {number} groupId ID of the group to leave
 * @throws {Error} if not signed in or if the request fails
 */

export async function leaveGroup(token, groupId) {
  if (!token) {
    throw Error("You are not signed in.");
  }

  const response = await fetch(API + "/groups/" + groupId + "/members/me", {
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      Authorization: "Bearer" + token,
    },
    body: JSON.stringify({ from: "group_members" }),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/**
 * Fetches all watch groups the logged-in user belongs to
 *
 * @param {string} token the bearer token for authentication
 * @returns {Array} list of the user's watch groups with their role in each
 * @throws {Error} when the request fails
 */

export async function getMyGroups(token) {
  const response = await fetch(API + "/watch-groups/mine", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}

/**
 * Fetches all watch events for a specific group
 *
 * @param {number} groupId  the watch group ID
 * @returns {Array} list of watch events with film details
 * @throws {Error} when the request fails
 */

export async function getWatchesByGroup(groupId) {
  const response = await fetch(API + "/group-watches/group/" + groupId);
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}

