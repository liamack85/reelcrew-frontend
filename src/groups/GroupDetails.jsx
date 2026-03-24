import { getGroupById, getMembers } from "#src/api/groups";
import { Box, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"

export default function GroupDetails() {
  const {id} = useParams();
  const [group, setGroup] = useState(null);
  const [groupMembers, setGroupMembers] = useState(null);
  
  const syncGroupDetail = async() => {
    const group = await getGroupById(id);
    const groupMembers = await getMembers(id);
    console.log(groupMembers);
    
    setGroup(group);
    setGroupMembers(groupMembers);
  }
  useEffect(()=>{
    syncGroupDetail();
  }, [id]);

  if(!group) return <p>Loading...</p>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <h1>Group Details</h1>
      <Link to="/groups">back to groups</Link>
      <p>Group Name: {group.name}</p>
      <p>Creator: {group.creator_id}</p>
      <p>Description: blah blah blah</p>
      
      <ul>
      {groupMembers.map((member)=>(
        <li key={member.id}>
          <p>{member.username}
          {member.role === "host" ? 
          <Chip label={member.role} size="small" sx={{ mt: 0.5 }} />
          : null}
          </p>
        </li>
      ))}
      </ul>
    </Box>
  )
}