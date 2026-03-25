import { getGroupById, getMembers, joinGroup } from "../api/groups";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import WatchPageList from "../watches/WatchPageList";

/**
 * Displays details for a single group, including its members.
 * @returns {JSX.Element}
 */
export default function GroupDetails() {
  const {token, user} = useAuth();
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [groupMembers, setGroupMembers] = useState(null);
  const [joining, setJoining] = useState(false);

  /**
   * Fetch group details and members from the API and update component state.
   */
  const syncGroupDetail = async () => {
    const group = await getGroupById(id);
    const groupMembers = await getMembers(id);
    setGroup(group);
    setGroupMembers(groupMembers);
  };
  useEffect(() => {
    syncGroupDetail();
  }, [id]);

  if (!group) return <p>Loading...</p>;

  // handler for user action JOIN
  const joinCurrentGroup = async () => {
    try {
      await joinGroup(token, id, user.id, "member"); // perform join      
      setJoining(true);
      await syncGroupDetail(); // refresh group and members
    } catch (err) {
      console.error('Join failed:', err);
    }
    setJoining(false);
  };


  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
      <Typography variant="h1">Group Details</Typography>
      <Link to="/groups">back to groups</Link>
      <Link to={"/watch-group/" + id + "/watches"}>View watch events</Link>
      <Typography variant="h2">
        {group.name} 
        <button onClick={joinCurrentGroup}>Join</button>
        <button>Leave Group</button>
      </Typography>
      <p>
        Description: Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Similique fugiat, aperiam nemo totam earum veniam, odit, molestias eius
        illo iure sequi ipsam neque veritatis! Assumenda enim ipsum eaque
        doloribus distinctio?
      </p>

      <ul>
        <p>Active members: {groupMembers.length}</p>
        {groupMembers.map((member) => (
          <li key={member.id}>
            {member.username}
            {member.role === "host" ? (
              <Chip label={member.role} size="small" sx={{ mt: 0.5 }} />
            ) : null}
          </li>
        ))}
      </ul>
      <WatchPageList />
    </Box>
  );
}
