import React, { useEffect } from "react"

import { Session } from "@supabase/supabase-js"
import { useNavigate } from "react-router-dom"

import Overview from "components/Overview"

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
      <Overview />
    </div>
  )
}

export default Home
