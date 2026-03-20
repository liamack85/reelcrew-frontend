import { useAuth } from "../auth/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
}
