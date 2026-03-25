const API = import.meta.env.VITE_API;

/**
 * Fetch all watch groups.
 */
export async function getGroups() {
  try {
    const response = await fetch(API + "/watch-groups");
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("CANNOT GET GROUPS: ", e);
  }
}

/**
 * Fetch a single watch group by ID.
 * @param {number} id - Group ID.
 */
export async function getGroupById(id) {
  try {
    const response = await fetch(API + "/watch-groups/" + id);
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("CANNOT GET GROUP BY ID: ", e);
  }
}

/**
 * Fetch members for a given group.
 * @param {number} id - Group ID.
 */
export async function getMembers(id) {
  try {
    const response = await fetch(API + "/watch-groups/" + id + "/members");
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("CANNOT GET GROUP MEMBERS: ", e);
  }
}

/**
 * Fetch groups for a given user ID.
 * @param {number} userId - User ID.
 */

export async function getGroupByUserId(userId) {
  try {
    const response = await fetch(API + "/watch-groups/" + userId);
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("CANNOT GET GROUP BY USER ID: ", e);
  }
}

/**
 * Create a new watch group.
 *
 * @param {string} token - Bearer token for authentication.
 * @param {string} name - Name of the new group.
 * @param {number} creator_id - ID of the creating user.
 * @throws {Error} When the response is not ok.
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
 * Request to join a group.
 *
 * @param {string} token - Bearer token for authentication.
 * @param {number} id - ID of the group to join.
 * @throws {Error} When the response is not ok.
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
 * Leave a group (remove current user from group members).
 *
 * @param {string} token - Bearer token for authentication.
 * @param {number} groupId - ID of the group to leave.
 * @throws {Error} If not signed in or if the request fails.
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

export async function getWatchesByGroup(groupId) {
  const response = await fetch(API + "/group-watches/group/" + groupId);
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}
