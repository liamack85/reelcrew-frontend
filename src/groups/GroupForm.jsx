import { useState } from "react";
import { createGroup } from "#src/api/groups";
import { useAuth } from "../auth/AuthContext.jsx";

export default function GroupForm({onCreated}) {
  const {token, user, openAuthModal} = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleForm = async (formData) => {
    setError('');
    setSuccess('');

    // Check if the token is available
    if (!token) {
      setError('Must be logged in to create a group.');
      return;
    }

    const groupName = formData.get("groupName");

    try {
      await createGroup(token, groupName, user.id);
      setSuccess('Group created.');
      onCreated(); // refresh list on parent

    } catch (err) {
      setError(err.message || 'CANNOT CREATE GROUP');
      console.error(err);
    }
  }

  return (
    <section>
      <form action={!token ? openAuthModal : handleForm}>
        <label>Group Name</label>
        <input required type="text" name="groupName" />
        <button type="submit">Create Group</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </section>
  )
}