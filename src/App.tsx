import { useEffect, useState } from "react";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Session } from "@supabase/supabase-js";

import { Button } from "./components/ui/button";

import useSupabase from "./hooks/useSupabase";

import "./App.css";

function App() {
  const { supabase } = useSupabase();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      {!session ? (
        <div style={{ width: "300px", margin: "0 auto", marginTop: "4em" }}>
          <Auth
            supabaseClient={supabase}
            providers={["google"]}
            appearance={{ theme: ThemeSupa }}
          />
        </div>
      ) : (
        <div>
          <h1>Welcome, {session.user?.email}</h1>
          <Button
            onClick={() => {
              supabase.auth.signOut();
            }}
          >
            Sign Out
          </Button>
        </div>
      )}

      {/* <ul>{shelves?.map((shelf) => <li key={shelf.id}>{shelf.name}</li>)}</ul> */}
    </div>
  );
}

export default App;
