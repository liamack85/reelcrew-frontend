import { useState } from "react";
import { createGroup } from "../api/groups";
import { useAuth } from "../auth/AuthContext.jsx";
import { useNavigate } from "react-router";

/**
 * Form component to create a new group.
 *
 * @param {Function} props.onCreated - Callback invoked after successful creation to refresh parent data.
 * @returns {JSX.Element}
 */
export default function GroupForm({ onCreated }) {
  const { token, user, openAuthModal } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  /**
   * Handle form submission: validates auth, calls API to create a group, and triggers onCreated.
   * @param {FormData} formData - FormData from the submitted form; expects a "groupName" field.
   */
  const handleForm = async (formData) => {
    setError("");
    setSuccess("");

    // Check if the token is available
    if (!token) {
      setError("Must be logged in to create a group.");
      return;
    }

    const groupName = formData.get("groupName");

    try {
      const newlyCreatedGroup = await createGroup(token, groupName, user.id);
      setSuccess("Group created.");
      navigate("/groups/"+newlyCreatedGroup.id);
    } catch (err) {
      setError(err.message || "CANNOT CREATE GROUP");
      console.error(err);
    }
  };

  return (
    <section>
      <form action={!token ? openAuthModal : handleForm}>
        <label>Group Name</label>
        <input required type="text" name="groupName" />
        <button type="submit">Create Group</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </section>
  );
}
