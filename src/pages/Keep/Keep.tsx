import React from "react"

import { User } from "@supabase/supabase-js"

import Button from "components/Button"

interface KeepProps {
  user: User
  handleSignOut: () => void
}

const Keep = ({ user, handleSignOut }: KeepProps) => {
  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  )
}

export default Keep
