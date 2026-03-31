import { deleteGroup, getGroupById, getMembers, joinGroup, leaveGroup } from "../api/groups";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";
import WatchForm from "../watches/WatchPageForm";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import WatchPageList from "../watches/WatchPageList";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";

/**
 * Displays details for a single group, including its members.
 * @returns {JSX.Element}
 */
export default function GroupDetails() {
  const {token, user} = useAuth();
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [groupMembers, setGroupMembers] = useState(null);
  const navigate = useNavigate();
  const [watchFormOpen, setWatchFormOpen] = useState(false);

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

  /**
   * Adds the user to the group, then refreshes the member list.
   */
  const joinCurrentGroup = async () => {
    try {
      await joinGroup(token, id, user.id, "member");
      await syncGroupDetail();
    } catch (err) {
      console.error('Join failed: ', err);
    }
  };

  /**
   * Removes the user from the group, then refreshes the member list.
   */
  const leaveCurrentGroup = async () => {
    try {
      await leaveGroup(token, id, user.id);
      await syncGroupDetail();
    } catch (err) {
      console.error('Leaving failed: ', err);
    }
  };

  const deleteCurrentGroup = async () => {
    try {
      await deleteGroup(token, id);
      navigate("/groups");
    } catch (err) {
      console.error('Delete failed: ', err);
    }
  };

  /**
   * Whether the current authenticated user is a member of the group.
   * @type {boolean}
   */
  const isMember = groupMembers.some(m => m.user_id === user.id);

  /**
   * Whether the current authenticated user is the host of the group.
   * @type {boolean}
   */
  const isHost = groupMembers.some(m => m.user_id === user.id && m.role === "host");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 1 }}>
      <Link to="/groups">back to groups</Link>
      <Typography variant="h2">
        {group.name}
        <Box sx={{ display: "flex", gap: 1 }}>
          {isMember ?
            <Button variant="outlined" onClick={leaveCurrentGroup}>Leave</Button> :
            <Button variant="outlined" onClick={joinCurrentGroup}>Join</Button>
          }
          <Button variant="contained" onClick={deleteCurrentGroup}>DELETE group</Button>
          {isHost && (
          <Button variant="outlined" onClick={() => setWatchFormOpen(true)}>
          Create watch event
          </Button>
    )}
          <Dialog open={watchFormOpen} onClose={() => setWatchFormOpen(false)}>
          <WatchForm onSuccess={() => {
            setWatchFormOpen(false);
            syncGroupDetail(); // refreshes the watch list after assigning
          }} />
        </Dialog>

        </Box>
      </Typography>
      <p>
        Description: Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Similique fugiat, aperiam nemo totam earum veniam, odit, molestias eius
        illo iure sequi ipsam neque veritatis! Assumenda enim ipsum eaque
        doloribus distinctio?
      </p>
      <Link to={"/watch-group/" + id + "/watches"}>View watch events</Link>
      <WatchPageList key={watchFormOpen} />
      <p>Active members: {groupMembers.length}</p>
      <Table>
        <TableBody>
          {groupMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                {member.username}
                {member.role === "host" ? (
                  <Chip label={member.role} size="small" sx={{ ml: 0.5 }} />
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}