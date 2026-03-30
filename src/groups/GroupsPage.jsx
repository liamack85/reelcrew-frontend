import { getGroups } from "../api/groups";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import GroupForm from "./GroupForm";
import { useAuth } from "../auth/AuthContext";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";



/**
 * displays all groups and a form to create new ones
 * @returns {JSX.Element}
 */
export default function GroupsPage() {
  const { token, openAuthModal } = useAuth();
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

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
      <Typography color="primary" variant="h2">All Groups</Typography>
      <GroupForm />

        {groups.map((group) => (
          <Card key={group.id} sx={{margin:1}}>
              <CardActionArea  onClick={!token ? openAuthModal : ()=>navigate("/groups/" + group.id)}>
                <Typography component="div" sx={{padding: 2}}>
                  {group.name}
                </Typography>
              </CardActionArea>
          </Card>
        ))}
      
    </section>
  );
}
