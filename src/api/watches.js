const API = import.meta.env.VITE_API;

export async function getCurrentWatch(groupId) {
  try {
    const response = await fetch(API+"/groups/"+groupId+"/watches/current");
    const result = response.json();
    return result;
  } catch (e) {
    console.log("CANNOT GET CURRENT WATCH: ", e)
  }
}

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

export async function getVotes(groupId) {
  try {
    const response = await fetch(API+"/groups/"+groupId+"/votes");
    const result = await response.json();
    return result;    
  } catch (e) {
    console.log('CANNOT GET VOTES: ', e);
  }
}