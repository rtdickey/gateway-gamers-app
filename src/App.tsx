import { useEffect, useState } from "react";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient, Session } from "@supabase/supabase-js";

import { Button } from "./components/ui/button";

import "./App.css";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

function App() {
  const [currentSession, setCurrentSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      {!currentSession ? (
        <div style={{ width: "300px", margin: "0 auto", marginTop: "4em" }}>
          <Auth
            supabaseClient={supabase}
            providers={["google"]}
            appearance={{ theme: ThemeSupa }}
          />
        </div>
      ) : (
        <div>
          <h1>Welcome, {currentSession.user?.email}</h1>
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
