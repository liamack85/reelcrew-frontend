import Dialog from "@mui/material/Dialog";
import { useAuth } from "./AuthContext";
import AuthPanel from "./AuthPanel";

export default function AuthModal() {
  const { modalOpen, closeAuthModal } = useAuth();
  return (
    <Dialog open={modalOpen} onClose={closeAuthModal} maxWidth="xs" fullWidth>
      <AuthPanel />
    </Dialog>
  );
}
