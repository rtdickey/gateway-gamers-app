import React, { useEffect } from "react"

import { Session } from "@supabase/supabase-js"
import { useNavigate } from "react-router-dom"

// import About from "components/About"

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
      Welcome to Gateway Gamers
      {/* <About /> */}
    </div>
  )
}

export default Home
