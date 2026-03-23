import { useState } from "react";

import { createGroup } from "#src/api/groups";

export default function groupForm({ token, creatorId }) {
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleForm = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check if the token is available
    if (!token) {
      setError('Must be logged in to create a group.');
      return;
    }

    try {
      const formData = await createGroup(token, groupName, creatorId);
      setSuccess('Group created.');
      console.log(formData);

    } catch (err) {
      setError(error.message || 'CANNOT CREATE GROUP');
      console.error(err);
    }
  }

  return (
    <section>
      <form action={handleForm}>
        <label>Group Name</label>
        <input required type="text" id="groupName" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
        <button type="submit">Create Group</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </section>
  )
}