import { getGroups } from "#src/api/groups"
import { useEffect, useState } from "react";
import { Link } from "react-router";
import GroupForm from "./groupForm";

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);

  useEffect(()=>{
    const syncGroups = async () => {
      const groups = await getGroups();
      setGroups(groups)
    }
    syncGroups();
  }, []);

  return (
    <section id="GroupsPage">
      <h1>All Groups</h1>
      <GroupForm />
      <ul>
        {groups.map((group)=>(
          <li key={group.id}>
            <Link to={"/groups/"+group.id}>
              {group.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}