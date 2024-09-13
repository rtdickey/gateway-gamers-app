import React from "react"

import { useNavigate } from "react-router-dom"

import useSession from "hooks/Supabase/useSession"

const Welcome = () => {
  const session = useSession()
  const navigate = useNavigate()
  if (session.isAuthenticated) {
    navigate("/GameKeep")
  }

  return <span>Please follow the link in your email.</span>
}

export default Welcome
