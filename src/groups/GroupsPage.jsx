import { getGroups } from "../api/groups";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import GroupForm from "./groupForm";

/**
 * displays all groups and a form to create new ones
 * @returns {JSX.Element}
 */
export default function GroupsPage() {
  const [groups, setGroups] = useState([]);

  /**
   * Fetch groups from the API and update groups state.
   */
  const syncGroups = async () => {
    const groups = await getGroups();
    setGroups(groups);
  };

  useEffect(() => {
    syncGroups();
  }, []);

  return (
    <section id="GroupsPage">
      <h1>All Groups</h1>
      <GroupForm onCreated={syncGroups} />
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <Link to={"/groups/" + group.id}>{group.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
