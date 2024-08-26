import { createClient } from "@supabase/supabase-js";

const useSupabase = () => {
  const url = process.env.REACT_APP_SUPABASE_URL!;
  const anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

  const supabase = createClient(url, anonKey);
  return { supabase };
};

export default useSupabase;
