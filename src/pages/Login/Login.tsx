import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { SupabaseClient } from "@supabase/supabase-js";

interface LoginProps {
  supabase: SupabaseClient;
}

const Login = ({ supabase }: LoginProps) => {
  return (
    <div style={{ width: "300px", margin: "0 auto", marginTop: "4em" }}>
      <Auth
        supabaseClient={supabase}
        providers={["google"]}
        appearance={{ theme: ThemeSupa }}
      />
    </div>
  );
};

export default Login;
