import { getGroupById } from "#src/api/groups";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"

export default function GroupDetails() {
  const {id} = useParams();
  const [groupDetail, setGroupDetail] = useState(null);
  
  const syncGroupDetail = async() => {
    const data = await getGroupById(id);
    setGroupDetail(data);
  }
  useEffect(()=>{
    syncGroupDetail();
  }, [id]);

  if(!groupDetail) return <p>Loading...</p>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <h1>Group Details</h1>
      <Link to="/groups">back to groups</Link>
      <p>Group Name: {groupDetail.name}</p>
      <p>Creator: {groupDetail.creator_id}</p>
      <Link to={"/watch-group/" + id + "/watches"}>View watch events</Link>
    </Box>
  )
}