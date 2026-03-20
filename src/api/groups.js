const API = import.meta.env.VITE_API;

export async function getGroups() {
  try {
    const response = await fetch(API+"/groups");
    const result = await response.json();
    return result;
  } catch (e) {
    console.log('CANNOT GET GROUPS: ', e);
  }
}

export async function getGroupById(id) {
  try {
    const response = await fetch(API+"/groups/"+id);
    const result = await response.json();
    return result;
  } catch (e) {
    console.log('CANNOT GET GROUP BY ID: ', e);
  }
}

export async function getGroupByUserId(userId) {
  try {
    const response = await fetch(API+"/groups"+userId);
    const result = await response.json();
    return result;
  } catch (e) {
    console.log('CANNOT GET GROUP BY USER ID: ', e);
  }
}

export async function createGroup(token, name, creatorId) {
  const response = await fetch(API + "/groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ name, creatorId }),
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}

export async function joinGroup(token, id) {
  const response = await fetch(API + "/groups", {
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

export async function leaveGroup(token, id) {
  if (!token) {
    throw Error("You are not signed in.");
  }

  const response = await fetch(API + "/groups/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
