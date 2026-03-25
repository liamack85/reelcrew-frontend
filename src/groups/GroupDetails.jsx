import { getGroupById, getMembers } from "#src/api/groups";
import { Box, Chip, Typography } from "@mui/material";
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
    <Box sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
      <Typography variant="h1">Group Details</Typography>
      <Link to="/groups">back to groups</Link>
      <p>Group Name: {groupDetail.name}</p>
      <p>Creator: {groupDetail.creator_id}</p>
      <Link to={"/watch-group/" + id + "/watches"}>View watch events</Link>
      <Typography variant="h2">{group.name} <button>Join</button><button>Leave Group</button></Typography>
      <p>Description: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique fugiat, aperiam nemo totam earum veniam, odit, molestias eius illo iure sequi ipsam neque veritatis! Assumenda enim ipsum eaque doloribus distinctio?</p>
      
      <ul>
      <p>Active members: {groupMembers.length}</p>
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