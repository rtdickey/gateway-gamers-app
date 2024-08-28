import { useEffect, useState } from "react";

import { createClient, Session } from "@supabase/supabase-js";

import "./App.css";
import Login from "./pages/Login/Login";
import Keep from "./pages/Keep";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

function App() {
  const [currentSession, setCurrentSession] = useState<Session | null>(null);

  const handleSignOut = () => {
    supabase.auth.signOut();
  };

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
        <Login supabase={supabase} />
      ) : (
        <Keep user={currentSession.user} handleSignOut={handleSignOut} />
      )}

      {/* <ul>{shelves?.map((shelf) => <li key={shelf.id}>{shelf.name}</li>)}</ul> */}
    </div>
  );
}

export default App;
