import { useEffect, useState } from "react";

import { Session } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";

import useSupabase from "./hooks/useSupabase";

import "./App.css";
import { ThemeMinimal, ThemeSupa } from "@supabase/auth-ui-shared";

function App() {
  const { supabase } = useSupabase();
  const [session, setSession] = useState<Session | null>(null);
  // const [shelves, setShelves] = useState<any[] | null>([]);

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

  // useEffect(() => {
  //   getShelves();
  // }, []);

  // async function getShelves() {
  //   const { data } = await supabase.from("shelves").select();
  //   setShelves(data);
  // }

  useEffect(() => {});

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
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </div>
      )}

      {/* <ul>{shelves?.map((shelf) => <li key={shelf.id}>{shelf.name}</li>)}</ul> */}
    </div>
  );
}

export default App;
