import { useEffect, useState } from "react"

import { Session } from "@supabase/supabase-js"
import { useNavigate } from "react-router-dom"

import { supabase } from "Supabase"

const useSession = () => {
  const [currentSession, setCurrentSession] = useState<Session | null>(null)
  const navigate = useNavigate()

  const handleSignOut = () => {
    supabase.auth.signOut()
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { session: currentSession, handleSignOut, isAuthenticated: !!currentSession }
}

export default useSession
