import React, { useEffect } from "react"

import { Session } from "@supabase/supabase-js"
import { useNavigate } from "react-router-dom"

interface HomeProps {
  session: Session | null
}

const Home = ({ session }: HomeProps) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!session) {
      navigate("/Login")
    }
  }, [session, navigate])

  return (
    <div>
      <h1>Welcome to Gateway Gamers</h1>
    </div>
  )
}

export default Home
