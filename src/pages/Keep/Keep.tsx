import { Button } from "../../components/ui/button";
import { User } from "@supabase/supabase-js";

interface KeepProps {
  user: User;
  handleSignOut: () => void;
}

const Keep = ({ user, handleSignOut }: KeepProps) => {
  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};

export default Keep;
