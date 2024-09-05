import React from "react"

import { useNavigate } from "react-router-dom"

import Overview from "components/Overview"
import useSession from "hooks/Supabase/useSession"

const Home: React.FC = () => {
  const { isAuthenticated } = useSession()
  const navigate = useNavigate()

  if (!isAuthenticated) {
    navigate("/Login")
  }

  return (
    <div>
      <Overview />
    </div>
  )
}

export default Home
