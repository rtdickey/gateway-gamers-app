import { useEffect, useState } from "react";

import { createClient, Session } from "@supabase/supabase-js";

import "./App.css";
import Login from "./pages/Login/Login";
import Keep from "./pages/Keep";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

function App() {
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  const handleSignOut = () => {
    supabase.auth.signOut();
    navigate("/");
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
        <Routes>
          <Route path="Login" element={<Login supabase={supabase} />} />
          <Route
            path="Keep"
            element={
              <Keep user={currentSession.user} handleSignOut={handleSignOut} />
            }
          />
          <Route path="/" element={<Home session={currentSession} />} />
        </Routes>
      )}

      {/* <ul>{shelves?.map((shelf) => <li key={shelf.id}>{shelf.name}</li>)}</ul> */}
    </div>
  );
}

export default App;
